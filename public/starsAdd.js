let coords = {};

getStars();

async function getStars() {
    const starResponse = await fetch('/Star');
    const starJson = await starResponse.json();
    for (let i = 0; i < starJson.length; i++){
      ellipse(starJson[i].x, starJson[i].y, starJson[i].r);
    }
}

function setup() {
  let cnv = createCanvas(600, 600);
  background(0);
}

function draw() {
  if (mouseIsPressed) {
    addStar();
    noLoop();
  }
}

async function addStar() {
  let r = random(10);
  coords.x = mouseX;
  coords.y = mouseY;
  coords.r = r;
  ellipse(coords.x, coords.y, r, r);


  const response = fetch('/Star', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(coords)
  })

}
