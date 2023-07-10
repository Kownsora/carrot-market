const calcTime = (timestamp) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000; //입력할때 세계시간으로 입력했으니 현재 보여지는 시간(한국시간 UTC+9)에서 9시간 더해주는 과정
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second > 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");

  //최신글로 정렬해주기 reverse
  data.reverse().forEach(async (obj) => {
    const div = document.createElement("div");
    div.className = "item-list";

    const imgDiv = document.createElement("div");
    imgDiv.className = "item-list__img";

    const img = document.createElement("img");
    const res = await fetch(`/images/${obj.id}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    img.src = url;

    const infoDiv = document.createElement("div");
    infoDiv.className = "item-list__info";

    const infoTitleDiv = document.createElement("div");
    infoTitleDiv.className = "item-list__info-title";
    infoTitleDiv.innerText = obj.title;

    const metaDiv = document.createElement("div");
    metaDiv.className = "item-list__info-meta";
    metaDiv.innerText = obj.place + " " + calcTime(obj.insertAt);

    const priceDiv = document.createElement("div");
    priceDiv.className = "item-list__info-price";
    priceDiv.innerText = obj.price;

    imgDiv.appendChild(img);
    div.appendChild(imgDiv);
    infoDiv.appendChild(infoTitleDiv);
    infoDiv.appendChild(metaDiv);
    infoDiv.appendChild(priceDiv);
    div.appendChild(infoDiv);
    main.appendChild(div);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
