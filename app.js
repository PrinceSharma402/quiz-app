const app = document.getElementById("app")

let index = 0
let answers = []
let captcha = ""

const quiz = [
 {q:"Capital of India?",o:["Delhi","Mumbai","Chennai","Kolkata"],a:0},
 {q:"5 + 3 = ?",o:["6","7","8","9"],a:2},
 {q:"HTML used for?",o:["Logic","Design","Structure","DB"],a:2},
 {q:"CSS full form?",o:["Color","Cascading","Creative","None"],a:1},
 {q:"JavaScript is?",o:["Markup","Programming","Style","DB"],a:1},
 {q:"Browser runs?",o:["HTML","CSS","JS","All"],a:3},
 {q:"Tailwind is?",o:["JS","CSS","DB","API"],a:1},
 {q:"Frontend example?",o:["Node","React","Mongo","PHP"],a:1},
 {q:"HTTP is?",o:["Protocol","Language","Server","DB"],a:0},
 {q:"LocalStorage stores?",o:["Temp","Permanent","Server","None"],a:1}
]

function makeCaptcha(){
  captcha = Math.random().toString(36).slice(2,7).toUpperCase()
  document.getElementById("capText").innerText = captcha
}

function loginUI(){
  app.innerHTML = `
  <div class="flex justify-center items-center min-h-screen">
    <div class="card">
      <h2 class="text-xl font-bold text-center mb-4">Student Login</h2>

      <input id="studentName" class="input" placeholder="Name">
      <input id="studentClass" class="input" placeholder="Class">
      <input id="rollNo" class="input" placeholder="Roll No">

      <div class="flex justify-between items-center mb-2">
        <span id="capText" class="px-3 py-2 bg-gray-200 rounded"></span>
        <button onclick="makeCaptcha()" class="text-sm text-indigo-600">Refresh</button>
      </div>

      <input id="capInput" class="input" placeholder="Enter Captcha">

      <button class="btn" onclick="login()">Login</button>
    </div>
  </div>`
  makeCaptcha()
}

function login(){
  const n = document.getElementById("studentName").value.trim()
  const c = document.getElementById("studentClass").value.trim()
  const r = document.getElementById("rollNo").value.trim()
  const cap = document.getElementById("capInput").value.trim()

  if(n==="" || c==="" || r===""){
    alert("Fill all fields")
    return
  }

  if(cap !== captcha){
    alert("Wrong captcha")
    makeCaptcha()
    document.getElementById("capInput").value = ""
    return
  }

  quizUI()
}

function quizUI(){
  app.innerHTML = `
  <div class="flex justify-center items-center min-h-screen">
    <div class="card w-[520px]">
      <div id="progress" class="mb-2 font-semibold"></div>
      <div id="question" class="mb-4 font-bold"></div>
      <div id="options" class="space-y-2"></div>

      <div class="flex justify-between mt-4">
        <button onclick="prev()" class="px-4 py-2 bg-gray-200 rounded">Prev</button>
        <button onclick="next()" class="px-4 py-2 bg-indigo-600 text-white rounded">Next</button>
      </div>

      <button id="submit" onclick="showResult()" class="btn mt-4 hidden">Submit</button>
    </div>
  </div>`
  load()
}

function load(){
  progress.innerText = `Question ${index+1} of 10`
  question.innerText = quiz[index].q
  options.innerHTML = ""

  quiz[index].o.forEach((x,i)=>{
    let d = document.createElement("div")
    d.className = "option"
    if(answers[index] === i) d.style.background = "#c7d2fe"
    d.innerText = x
    d.onclick = ()=>{
      answers[index] = i
      load()
    }
    options.appendChild(d)
  })

  submit.classList.toggle("hidden", index !== 9)
}

function next(){ if(index<9){ index++; load() } }
function prev(){ if(index>0){ index--; load() } }

function showResult(){
  let score = 0
  app.innerHTML = `
  <div class="p-6">
    <h1 class="text-2xl font-bold text-center mb-6">Result</h1>
    <div id="rev" class="max-w-3xl mx-auto space-y-4"></div>
  </div>`

  quiz.forEach((q,i)=>{
    if(answers[i] === q.a) score++
    rev.innerHTML += `
    <div class="card w-full">
      <b>${i+1}. ${q.q}</b>
      <p>Your: ${q.o[answers[i]] || "NA"}</p>
      <p>Correct: ${q.o[q.a]}</p>
    </div>`
  })

  rev.innerHTML += `
  <div class="card text-center font-bold">
    Score: ${score}/10
  </div>`
}

loginUI()
