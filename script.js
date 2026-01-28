document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("checkBtn").addEventListener("click", calculateFlames);
});

function calculateFlames() {
  let name1 = document.getElementById("name1").value.trim();
  let name2 = document.getElementById("name2").value.trim();
  let other = document.getElementById("otherNames").value.trim();
  let funny = document.getElementById("funnyText").value.trim();

  if (name1 === "" || name2 === "") {
    alert("⚠️ Please enter both names!");
    return;
  }

  let count = (name1 + name2).length;
  let flames = ["Friends 💛", "Lovers ❤️", "Affection 💕", "Marriage 💍", "Enemies 💢", "Siblings 👨‍👩‍👧"];
  let index = (count % flames.length) - 1;
  if (index < 0) index = flames.length - 1;
  let result = flames[index];

  // Update Card Content
  document.getElementById("namesLine").innerText = `${name1} ❤️ ${name2}`;
  document.getElementById("cardResult").innerText = result;
  document.getElementById("otherNamesCard").innerText = other ? `Other Names: ${other}` : "";
  document.getElementById("funnyTextCard").innerText = funny ? `😂 ${funny}` : "";
  document.getElementById("resultCard").style.display = "block";
}

// Share Function
function shareOn(platform) {
  let card = document.getElementById("resultCard");
  html2canvas(card).then(canvas => {
    let imgData = canvas.toDataURL("image/png");

    // Convert image to blob for sharing
    fetch(imgData)
      .then(res => res.blob())
      .then(blob => {
        let file = new File([blob], "flames-result.png", { type: "image/png" });

        // If Web Share API supported
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({
            files: [file],
            text: "🔥 Play FLAMES with your name and your crush! ❤️\nFind out now 👉 https://flames.ink"
          });
        } else {
          // If share not supported, use specific platform links
          if (platform === "whatsapp") {
            let msg = encodeURIComponent("🔥 Check our FLAMES result! ❤️\nPlay here 👉 https://flames.ink");
            window.open(`https://wa.me/?text=${msg}`, "_blank");
          } 
          else if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=https://flames.ink`, "_blank");
          } 
          else if (platform === "x") {
            let msg = encodeURIComponent("🔥 Check our FLAMES result! ❤️\nPlay now 👉 https://flames.ink");
            window.open(`https://twitter.com/intent/tweet?text=${msg}`, "_blank");
          } 
          else if (platform === "instagram") {
            alert("Instagram DMs don’t support direct web sharing.\nPlease use your Instagram app to send the image as a message.");
          } 
          else if (platform === "sharechat") {
            alert("Open ShareChat app and share manually. Web sharing isn’t supported.");
          }
        }
      });
  });
}

// Download Function
function downloadCard() {
  let card = document.getElementById("resultCard");
  html2canvas(card).then(canvas => {
    let link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "flames-result.png";
    link.click();
  });
}
