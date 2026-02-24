//empty array to store data
let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

//get count id
let total = document.getElementById('total');
let thriveingCount = document.getElementById('thriveing-count');
let strugglingCount = document.getElementById('struggleing');

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
  thriveingCount.innerText = thrivingList.length;
  strugglingCount.innerText = strugglingList.length;
}
calculateCount();

//3 btn toggling
const allFilterBtn = document.getElementById('all-filter-btn');
const thrivingFilterBtn = document.getElementById('thriving-filter-btn');
const strugglingFilterBtn = document.getElementById('struggling-filter-btn');

//home btn toggle action
function toggleStyle(id) {
  allFilterBtn.classList.remove('bg-black', 'text-white');
  thrivingFilterBtn.classList.remove('bg-black', 'text-white');
  strugglingFilterBtn.classList.remove('bg-black', 'text-white');

  //add class bg and text
  allFilterBtn.classList.add('bg-gray-300', 'text-black');
  thrivingFilterBtn.classList.add('bg-gray-300', 'text-black');
  strugglingFilterBtn.classList.add('bg-gray-300', 'text-black');

  //
  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove('bg-gray-300');
  selected.classList.add('bg-black', 'text-white');

  //get render id
  const filterSection = document.getElementById('filtered-section');
  const strugglSection = document.getElementById('struggled-section');

  if (id === 'thriving-filter-btn') {
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderThriving();
  } else if (id === 'all-filter-btn') {
    allCard.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else if (id === 'struggling-filter-btn') {
    allCard.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderStruggling();
  }
}

//event deligation by main
const mainContainer = document.querySelector('main');

//main function
mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('thriving-btn')) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const plantName = parentNode.querySelector('.plantName').innerText;

    const describe = parentNode.querySelector('.describe').innerText;

    const jobStatus = parentNode.querySelector('.job-status').innerText;

    const status = parentNode.querySelector('.status').innerText;

    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerHTML = `
     <p id="status" class="status"><span class="border px-5 py-1 ">thrive</span></p>`;

    const cardInfo = {
      plantName,
      describe,
      jobStatus,
      status: 'thrive',
      notes,
    };
    const plantExist = thrivingList.find(
      (item) => item.plantName === cardInfo.plantName,
    );

    if (!plantExist) {
      thrivingList.push(cardInfo);
    }
    strugglingList = strugglingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );
    calculateCount();
    if (currentStatus == 'struggling-filter-btn') {
      renderStruggling();
    }
  } else if (event.target.classList.contains('struggling-btn')) {
    const parentNode = event.target.parentNode.parentNode.parentNode;
    const plantName = parentNode.querySelector('.plantName').innerText;

    const describe = parentNode.querySelector('.describe').innerText;

    const jobStatus = parentNode.querySelector('.job-status').innerText;

    const status = parentNode.querySelector('.status').innerText;

    const notes = parentNode.querySelector('.notes').innerText;

    parentNode.querySelector('.status').innerHTML = `
     <p id="status" class="status"><span class="border px-5 py-1 ">struggling</span></p>`;

    const cardInfo = {
      plantName,
      describe,
      jobStatus,
      status: 'struggle',
      notes,
    };
    const plantExist = strugglingList.find(
      (item) => item.plantName === cardInfo.plantName,
    );

    if (!plantExist) {
      strugglingList.push(cardInfo);
    }

    thrivingList = thrivingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );
    if (currentStatus == 'thriving-filter-btn') {
      renderThriving();
    }

    calculateCount();
  }
  
  else if (event.target.classList.contains('delete-btn')) {
    const parentNode = event.target.closest('.card');
    const plantName = parentNode.querySelector('.plantName').innerText;

    // UI theke card remove
    parentNode.remove();

    // Array theke data remove
    thrivingList = thrivingList.filter((item) => item.plantName !== plantName);
    strugglingList = strugglingList.filter(
      (item) => item.plantName !== plantName,
    );

    // Dashboard update
    calculateCount();
  }
});

//get filtersection
const filterSEction = document.getElementById('filtered-section'); //empty section

//rendering thriving
function renderThriving() {
  filterSEction.innerHTML = '';
  for (let thrive of thrivingList) {
    let div = document.createElement('div');

    div.className =
      'card shadow rounded flex flex-col md:flex-row justify-between';

    div.innerHTML = `
    
    <div class=" p-5 space-y-3 ">
            <h2 class="plantName text-2xl font-semibold bg-white">${thrive.plantName}</h2>
            <p class=" describe text-sm text-[#777]">Lorem ipsum dolor sit amet.</p>
            <p class="job-status">remote .fulltime</p>
            <p id="status" class=" status"><span class="border px-5 py-1">${thrive.status}</span></p>
            <p class="notes">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, accusamus.</p>
            <div class="flex gap-5">
              <button class="thriving-btn px-7 py-1 border border-green-400 font-semibold rounded">Triving</button>
              <button class="struggling-btn px-7 py-1 border border-red-400 font-semibold rounded">struggling</button>
            </div>

          </div>
          <div class="p-5">
            <button class=" delete-btn px-7 py-1 bg-red-100 text-red-600 font-semibold rounded">delete</button>
          </div>
          
    `;
    calculateCount();
    filterSEction.appendChild(div);
  }
}

//rendering struggling
function renderStruggling() {
  filterSEction.innerHTML = '';
  for (let struggle of strugglingList) {
    let div = document.createElement('div');

    div.className =
      'card shadow rounded flex flex-col md:flex-row justify-between';

    div.innerHTML = `
    <div class=" p-5 space-y-3 mb-5">
            <h2 class="plantName text-2xl font-semibold bg-white">${struggle.plantName}</h2>
            <p class=" describe text-sm text-[#777]">Lorem ipsum dolor sit amet.</p>
            <p class="job-status">remote .fulltime</p>
            <p id="status" class=" status"><span class="border px-5 py-1">${struggle.status}</span></p>
            <p class="notes">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi, accusamus.</p>
            <div class="flex gap-5">
              <button class="thriving-btn px-7 py-1 border border-green-400 font-semibold rounded">Triving</button>
              <button class="struggling-btn px-7 py-1 border border-red-400 font-semibold rounded">struggling</button>
            </div>

          </div>
          <div class="p-5">
            <button class=" delete-btn px-7 py-1 bg-red-100 text-red-600 font-semibold rounded">delete</button>
          </div>
    `;
    calculateCount();
    filterSEction.appendChild(div);
  }
}
