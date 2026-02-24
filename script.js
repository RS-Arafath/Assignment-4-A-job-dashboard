//empty array to store data
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

//get count id
let total = document.getElementById('total');
let interviewCount = document.getElementById('interview-count');
let rejectedCount = document.getElementById('rejected-count');
const noJob = document.getElementById('no-job');

//total card
const allCard = document.getElementById('all-cards');
// const totalChild = allCard.children.length;

//macine function ->calculate count
// function calculateCount() {
//   total.innerText = totalChild;
//   thriveingCount.innerText = thrivingList.length;
//   strugglingCount.innerText = strugglingList.length;
// }
// calculateCount();

function calculateCount() {
  total.innerText = allCard.querySelectorAll('.card').length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;
}
calculateCount();

//3 btn toggling
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

//home btn toggle action
function toggleStyle(id) {
  allFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  interviewFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');
  rejectedFilterBtn.classList.remove('bg-[#3B82F6]', 'text-white');

  //add class bg and text
  allFilterBtn.classList.add('bg-white', 'text-black');
  interviewFilterBtn.classList.add('bg-white', 'text-black');
  rejectedFilterBtn.classList.add('bg-white', 'text-black');

  //
  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove('bg-white');
  selected.classList.add('bg-[#3B82F6]', 'text-white');

  //get render id
  const filterSection = document.getElementById('filtered-section');
  // const strugglSection = document.getElementById('struggled-section');

  /* if (id === 'interview-filter-btn') {
    if (interviewList.length == 0) {
      noJob.classList.remove = 'hidden';
    } else {
      noJob.classList.add = 'hidden';
    }
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'all-filter-btn') {
     if (allCard.children.length == 0) {
       noJob.classList.remove = 'hidden';
     } else {
       noJob.classList.add = 'hidden';
     }
    allCard.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else if (id === 'rejected-filter-btn') {
    if (rejectedList.length == 0) {
      noJob.classList.remove = 'hidden';
    } else {
      noJob.classList.add = 'hidden';
    }
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  } */
  
  
  if (id === 'interview-filter-btn') {
    // এখানে ভুল ছিল, .remove('hidden') হবে
    if (interviewList.length == 0) {
      noJob.classList.remove('hidden');
    } else {
      noJob.classList.add('hidden');
    }
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'all-filter-btn') {
    if (allCard.children.length == 0) {
      noJob.classList.remove('hidden');
    } else {
      noJob.classList.add('hidden');
    }
    allCard.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else if (id === 'rejected-filter-btn') {
    if (rejectedList.length == 0) {
      noJob.classList.remove('hidden');
    } else {
      noJob.classList.add('hidden');
    }
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  }
}

//event deligation by main
const mainContainer = document.querySelector('main');

//main function
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const companyName = parentNode.querySelector('.companyName').innerText;

    const jobPosition = parentNode.querySelector('.job-position').innerText;

    const jobStatus = parentNode.querySelector('.job-status').innerText;

    const status = parentNode.querySelector('.status').innerText;

    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerHTML =
      ` <p id="status" class=" status"><span class=" px-5 py-2 font-semibold text-base rounded  bg-[#10b981] text-white">Interview</span></p>`;

    const cardInfo = {
      companyName,
      jobPosition,
      jobStatus,
      status,
      notes,
    };
    const companyExist = interviewList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!companyExist) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );
    calculateCount();
    if (currentStatus == 'rejected-filter-btn') {
      renderRejected();
    }
  } else if (event.target.classList.contains('rejected-btn')) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const companyName = parentNode.querySelector('.companyName').innerText;

    const jobPosition = parentNode.querySelector('.job-position').innerText;

    const jobStatus = parentNode.querySelector('.job-status').innerText;

    const status = parentNode.querySelector('.status').innerText;

    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerHTML = `
     <p id="status" class="status"><span class=" px-5 py-2 font-semibold text-base rounded  bg-[#EF4444] text-black">Rejected</span></p>
    `;

    const cardInfo = {
      companyName,
      jobPosition,
      jobStatus,
      status,
      notes,
    };
    const companyExist = rejectedList.find(
      (item) => item.companyName === cardInfo.companyName,
    );

    if (!companyExist) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );
    if (currentStatus == 'interview-filter-btn') {
      renderInterview();
    }

    calculateCount();
    //delete card
  }
  if (event.target.classList.contains('delete-btn')) {
    const parentNode = event.target.closest('.card');
    const companyName = parentNode.querySelector('.companyName').innerText;

    // remove from ui
    parentNode.remove();

    // remove from array
    interviewList = interviewList.filter(
      (item) => item.companytName !== companyName,
    );

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== companyName,
    );

    // Dashboard update
    calculateCount();
  }
});

//get filtersection
const filterSEction = document.getElementById('filtered-section'); //empty section

//rendering interview
function renderInterview() {
  filterSEction.innerHTML = '';
  for (let interview of interviewList) {
    let div = document.createElement('div');

    div.className = 'card shadow rounded flex  justify-between ';

    div.innerHTML = `
    
    <div class=" p-5  ">
            <h2 class="companyName plantname text-xl font-semibold text-[#002C5C]">${interview.companyName}</h2>
            <p class=" describe job-position text-base pb-4  text-[#777]">Senior Frontend Developer</p>
            <p class="job-status pb-6 text-sm text-[#64748B] ">San Francisco, CA
            •
            Full-time
            •
            $130,000 - $175,000</p>
            <p id="status" class="pb-5 status"><span class=" px-5 py-2 font-semibold text-base rounded  bg-[#EEF4FF]">No
                applied</span></p>
            <p class="notes description text-sm pb-6 text-[#323B49]">We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You
            will work with a talented team on cutting-edge projects.</p>
            <div class="flex gap-5">
              <button
                class="thriving-btn interview-btn cursor-pointer px-3 py-1 border border-green-400 font-semibold text-base rounded hover:bg-[#10b981] hover:text-black duration-300 text-[#10B981]">INTERVIEW</button>
              <button
                class="rejected-btn px-3 py-1 cursor-pointer hover:bg-[#ef4444] hover:text-black duration-300 border text-[#EF4444] border-red-600 font-semibold rounded">REJECTED</button>
            </div>

          </div>
          <div class="p-5">
            <button id="delete-btn"
              class=" delete-btn p-1 hover:bg-gray-300 duration-300 cursor-pointer text-sm  text-[#64748B] rounded-full font-semibold border "><i
                class="fa-solid fa-trash-can"></i></button>
          </div>
          
    `;
    calculateCount();
    filterSEction.appendChild(div);
  }
}

//rendering struggling
function renderRejected() {
  filterSEction.innerHTML = '';
  for (let rejected of rejectedList) {
    let div = document.createElement('div');

    div.className = 'card shadow rounded flex  justify-between ';

    div.innerHTML = `
    
    <div class=" p-5  ">
            <h2 class="companyName plantname text-xl font-semibold text-[#002C5C]">${rejected.companyName}</h2>
            <p class=" describe job-position text-base pb-4  text-[#777]">Senior Frontend Developer</p>
            <p class="job-status pb-6 text-sm text-[#64748B] ">San Francisco, CA
            •
            Full-time
            •
            $130,000 - $175,000</p>
            <p id="status" class="pb-5 status"><span class=" px-5 py-2 font-semibold text-base rounded  bg-[#EEF4FF]">No
                applied</span></p>
            <p class="notes description text-sm pb-6 text-[#323B49]">We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You
            will work with a talented team on cutting-edge projects.</p>
            <div class="flex gap-5">
              <button
                class="thriving-btn interview-btn cursor-pointer px-3 py-1 border border-green-400 font-semibold text-base rounded hover:bg-[#10b981] hover:text-black duration-300 text-[#10B981]">INTERVIEW</button>
              <button
                class="rejected-btn px-3 py-1 cursor-pointer hover:bg-[#ef4444] hover:text-black duration-300 border text-[#EF4444] border-red-600 font-semibold rounded">REJECTED</button>
            </div>

          </div>
          <div class="p-5">
            <button id="delete-btn"
              class=" delete-btn p-1 hover:bg-gray-300 duration-300 cursor-pointer text-sm  text-[#64748B] rounded-full font-semibold border "><i
                class="fa-solid fa-trash-can"></i></button>
          </div>
          
    `;
    calculateCount();
    filterSEction.appendChild(div);
  }
}
