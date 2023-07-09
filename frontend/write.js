const form = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(form);
  //세계시간 기준으로 보내줌
  body.append("insertAt", new Date().getTime());
  try {
    const res = await fetch("/items", {
      method: "POST",
      body: body,
    });

    const data = await res.json();

    if (data == "200") window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

form.addEventListener("submit", handleSubmitForm);
