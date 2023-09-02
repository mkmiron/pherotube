const categories = document.getElementById("categories");
const videos = document.getElementById("videos");
const sortByViewBtn = document.getElementById("sorter");
let videoData = [];
let seconds = 0;
let years = 0;
let months = 0;
let days = 0;
let hours = 0;
let minutes = 0;

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/videos/categories", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const flex = document.createElement("div");
      flex.classList.add(
        "flex",
        "justify-center",
        "items-center",
        "md:gap-[24px]",
        "gap-[12px]"
      );
      data.data.forEach((category) => {

        // console.log(category.category);
        const button = document.createElement("button");
        button.classList.add(
          "category-btn",
          "md:px-[20px]",
          "px-[10px]",
          "md:py-[8px]",
          "py-[3px]",
          "bg-[#d3dce3]",
          "rounded-[4px]",
          "text-[#5d5d5d]",
          "hover:bg-[#FF1F3D]",
          "hover:text-white",
          "transition",
          "duration-300"
        );
        button.innerText = category.category;
        button.setAttribute("category_id", category.category_id);

        // make the first button active
        if (category.category_id == 1000) {
          button.classList.add("active");
        }
        button.addEventListener("click", () => {
          if (button.attributes["category_id"].value == category.category_id) {
            const active = document.querySelectorAll(".active");
            active.forEach((btn) => {
              btn.classList.remove("active");
            });
            button.classList.add("active");

            loadVideos(category.category_id);
          }
        });
        flex.appendChild(button);
      });
      categories.appendChild(flex);
    });
};

const loadVideos = (id) => {
  videos.innerHTML = "";
  fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.data.length === 0) {
        videos.innerHTML = `<div class="md:py-[100px] py-[40px] flex justify-center items-center text-center flex-col">
            <img src="img/No_content.png" alt="error" class="w-[200px] h-[200px] mb-[32px]">
            <h2 class="md:text-[32px] text-lg font-bold">
            Oops!! Sorry, There is no<br/> content here
            </h2>
            </div>`;
      } else {
        const grid = document.createElement("div");
        grid.classList.add(
          "grid",
          "lg:grid-cols-4",
          "md:grid-cols-2",
          "grid-cols-1",
          "gap-[24px]"
        );
        videoData = data.data;

        videoData.forEach((video) => {
          seconds = video.others.posted_date;
          years = Math.floor(seconds / (3600 * 24 * 365));
          seconds -= years * 3600 * 24 * 365;
          months = Math.floor(seconds / (3600 * 24 * 30));
          seconds -= months * 3600 * 24 * 30;
          days = Math.floor(seconds / (3600 * 24));
          seconds -= days * 3600 * 24;
          hours = Math.floor(seconds / 3600);
          seconds -= hours * 3600;
          minutes = Math.floor(seconds / 60);
          seconds -= minutes * 60;
          seconds = seconds.toFixed(0);

          console.log({ years, months, days, hours, minutes, seconds });
          const card = document.createElement("div");
          card.classList.add("card");
          card.innerHTML = `
                  <div class="card-img relative">
                      <img src="${
                        video.thumbnail
                      }" class="h-[200px] w-full object-cover object-center rounded-[8px]" alt="" />  
                      ${
                        seconds &&
                        `<span class="text-[13px] bg-black inline-block px-[20px] text-white rounded-[4px] absolute bottom-[10px] right-[10px]">
                        ${years > 0 ? `${years} yrs` : ""}
                        ${months > 0 ? `${months} mons` : ""}
                        ${days > 0 ? `${days} days` : ""}
                        ${hours > 0 ? `${hours} hrs` : ""}
                        ${minutes > 0 ? `${minutes} mins` : ""}
                        ${seconds > 0 ? `${seconds} secs` : ""}
                        ${video.others.posted_date ? `ago` : ""}
                        </span>`
                      }
                  </div>

                  <div class="card-body py-[20px]">
                        <div class="flex justify-start items-start gap-[12px]">
                            <img src="${
                              video.authors[0].profile_picture
                            }" class="h-[40px] w-[40px] rounded-full object-cover object-top" alt="" />
                            <div className="details">
                                <p class="text-lg font-bold">
                                    ${video.title}
                                </p>
                                <p class="text-sm text-[#5d5d5d] flex justify-start items-center gap-[10px]">
                                    ${video.authors[0].profile_name}
                                    ${
                                      video.authors[0].verified &&
                                      `<img src="img/verified.svg" alt="verified">`
                                    }
                                </p>
                                <p class="text-sm text-[#5d5d5d]">
                                    ${video.others.views} views
                                </p>
                            </div>
                        </div>
                    </div>
                  `;

          grid.appendChild(card);
        });

        // sort by view
        sortByViewBtn.addEventListener("click", () => {
          grid.innerHTML = "";
          videoData.sort((a, b) => {
            return parseInt(b.others.views) - parseInt(a.others.views);
          });

          videoData.forEach((video) => {
            seconds = video.others.posted_date;
            years = Math.floor(seconds / (3600 * 24 * 365));
            seconds -= years * 3600 * 24 * 365;
            months = Math.floor(seconds / (3600 * 24 * 30));
            seconds -= months * 3600 * 24 * 30;
            days = Math.floor(seconds / (3600 * 24));
            seconds -= days * 3600 * 24;
            hours = Math.floor(seconds / 3600);
            seconds -= hours * 3600;
            minutes = Math.floor(seconds / 60);
            seconds -= minutes * 60;
            seconds = seconds.toFixed(0);
            console.log({ years, months, days, hours, minutes, seconds });
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                      <div class="card-img relative">
                          <img src="${
                            video.thumbnail
                          }" class="h-[200px] w-full object-cover object-center rounded-[8px]" alt="" />  
                          ${
                            seconds &&
                            `<span class="text-[13px] bg-black inline-block px-[20px] text-white rounded-[4px] absolute bottom-[10px] right-[10px]">
                            ${years > 0 ? `${years} yrs` : ""}
                            ${months > 0 ? `${months} mons` : ""}
                            ${days > 0 ? `${days} days` : ""}
                            ${hours > 0 ? `${hours} hrs` : ""}
                            ${minutes > 0 ? `${minutes} mins` : ""}
                            ${seconds > 0 ? `${seconds} secs` : ""}
                            ${video.others.posted_date ? `ago` : ""}
                            </span>`
                          }
                      </div>
                      <div class="card-body py-[20px]">
                            <div class="flex justify-start items-start gap-[12px]">
                                <img src="${
                                  video.authors[0].profile_picture
                                }" class="h-[40px] w-[40px] rounded-full object-cover object-top" alt="" />
                                <div className="details">
                                    <p class="text-lg font-bold">
                                        ${video.title}
                                    </p>
                                    <p class="text-sm text-[#5d5d5d] flex justify-start items-center gap-[10px]">
                                        ${video.authors[0].profile_name}
                                        ${
                                          video.authors[0].verified &&
                                          `<img src="img/verified.svg" alt="verified">`
                                        }
                                    </p>
                                    <p class="text-sm text-[#5d5d5d]">
                                        ${video.others.views} views
                                    </p>
                                </div>
                            </div>
                        </div>
                      `;
            grid.appendChild(card);
          });
        });
        videos.appendChild(grid);
      }
    });
};

loadCategories();
loadVideos(1000);