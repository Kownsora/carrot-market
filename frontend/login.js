const form = document.querySelector("#login-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "post",
    body: formData,
  });

  const data = await res.json();
  console.log("엑세스토큰", data.access_token);

  if (res.status === 200) {
    console.log(res.status);
    alert("로그인이 성공했어요.");
  } else if (res.status === 401) {
    alert("ID 혹은 PASSWORD가 틀렀습니다.");
  }
};

form.addEventListener("submit", handleSubmitForm);
