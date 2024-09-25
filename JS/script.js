
const allPostUrl = `https://openapi.programming-hero.com/api/retro-forum/posts`
const latestPostsUrl =`https://openapi.programming-hero.com/api/retro-forum/latest-posts`
let readCount = 0;

const loadData = async(postUrl) =>{
    const res = await fetch(postUrl)
    const data = await res.json()
    const posts = data.posts
    // console.log(posts)
    showPosts(posts);
}

const loadLatestPosts = async () => {
    const res = await fetch(latestPostsUrl)
    const data = await res.json()
    // console.log(data)
    showLatestPosts(data);
}

const loadSearchData = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`)
  const data = await res.json();
  const posts = data.posts;
  showPosts(posts);
}
const showPosts = (posts) => {
    const postsContainer = document.getElementById('posts-container')
    postsContainer.innerHTML = ''
    posts.forEach(post => {
        // console.log(post)
        const postElement = document.createElement('div')
        postElement.classList = 'flex w-[750px] bg-[#F3F3F5] rounded-2xl py-4 px-2 mb-6'
        postElement.innerHTML = `
              <!-- Post image -->
            <div class="flex bg-[#797DFC1A rounded-lg] pr-8 pl-2">
                <div>
                  <div class="relative">
                    <img class="w-24 h-20 rounded-lg" src=${post.image} alt="">
                    <span class="-top-1 left-[85px] absolute  w-4 h-4 ${post.isActive ? 'bg-green-400' : `bg-red-400`}  border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </div>
            </div>
            <!-- Post content --> 
            <div class="divide-y divide-dashed flex-1">
              <div class="pb-8">
                <p >#${post.category}  <span class="pl-3">Author: ${post.author.name}</span></p>
                <h2 id="${post.id}" class="text-xl font-bold mb-4">${post.title}</h2>
                <p>${post.description}</p>
              </div>
              <div class="flex justify-between items-center pt-8">
                <div class="flex gap-4">
                    <p><i class="fa-regular fa-message"></i> <span>${post.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i>  <span>${post.posted_time} min</span></p>
                </div>
                <div>
                  <button onclick="markAsRead(${post.view_count}, ${post.id})" class="btn rounded-full">
                    <i class="fa-regular fa-envelope text-green-600"></i>
                  </button>
                </div>
              </div>
            </div>
        `
        postsContainer.appendChild(postElement)
    })
    document.getElementById('loader').classList.add('hidden')
}
const showLatestPosts = (posts) => {
    const latestPostsElement = document.getElementById('latest-posts')
    latestPostsElement.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement('div');
        div.classList = 'card bg-base-100 w-96 shadow-xl';
        div.innerHTML =`
                    <figure class="px-5 pt-5">
              <img
                src=${post.cover_image}
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body">
              <p><i class="fa-regular fa-calendar-days"></i><span class="pl-2">${post.author.posted_date || 'Unknown'}</span></p>
              <h2 class="card-title mb-3">${post.title}</h2>
              <p>${post.description}</p>
              <div class="flex items-center mt-2">
                <div>
                  <div class="avatar">
                    <div class="w-16 rounded-full">
                      <img src= ${post.profile_image} />
                    </div>
                  </div>
                </div>
                <div class="ml-3">
                  <h3 class="font-bold">${post.author.name}</h3>
                  <p>${post.author.designation || 'Unknown'}</p>
                </div>
               </div>
          </div>
        `
        latestPostsElement.appendChild(div);
    })
}
const markAsRead = (view,id) => {
  readCount++;
  const markAsReadElement = document.getElementById('mark-as-read-container');
  const readCountElement = document.getElementById('read-count')
  const postTitle = document.getElementById(id).innerText
  readCountElement.innerText = readCount;
  const div = document.createElement('div');
  div.classList ='flex justify-between items-center bg-white p-3 rounded-lg mt-2 gap-5';
  div.innerHTML =`
                    <div >
                    <p>${postTitle}</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="fa-regular fa-eye"></i> <span> ${view}</span>
                  </div>
  `
  markAsReadElement.appendChild(div);
}

const takeSearchText = () =>{
  const textSearch = document.getElementById('input-text').value;
  loadSearchData(textSearch);
}
loadData(allPostUrl);
loadLatestPosts(latestPostsUrl);