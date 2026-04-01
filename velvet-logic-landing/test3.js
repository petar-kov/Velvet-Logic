async function run() {
  const res = await fetch("https://velvetlogicagency.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Test",
      companyName: "Test",
      email: "kpeta@example.com",
      phone: "123",
      message: "Test message",
      lang: "ENG"
    })
  });
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Body:", text);
}
run();
