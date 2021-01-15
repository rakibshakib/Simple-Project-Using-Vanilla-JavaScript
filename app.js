window.onload = function(){

    const addTaskBtn = document.querySelector('#addTaskBtn')
    const allTaskParent = document.querySelector('#allTask')
    const taskField = document.getElementById('taskField')

    taskField.addEventListener("keypress", function (event){
        if (event.keyCode === 13) {
            event.stopPropagation() 
            if(this.value){
                createNewTask(allTaskParent, event.target.value)
                this.value = ''
            }else{
                alert("plese enter something")
            }
            // createNewTask(allTaskParent, event.target.value)
            // this.value = ''
        }
    })
    addTaskBtn.addEventListener("click", function (event){ 
        event.stopPropagation() 
        if(taskField.value){
            createNewTask(allTaskParent, taskField.value)
            taskField.value = ''
        }else{
            alert("plese enter something")
        }
    })


}
function createNewTask(parent, task) {
    console.log(task)
    let col = create({ 'class': 'col-sm-3' })
    let singleTask = create({ 'class': 'single-task d-flex justify-content-between' })

    let single_taskp = create()
    singleTask.appendChild(single_taskp)

    let singleTaskP = create('p')
    singleTaskP.innerHTML = task
    single_taskp.appendChild(singleTaskP)

    let span_div = create()
    singleTask.appendChild(span_div)

    let span = create('span', { 'class': "ml-auto" })
    span.innerHTML = '<i class="fa fa-times-circle"></i>'
    span.addEventListener('click', function () {
        parent.removeChild(col)
    })
    span_div.appendChild(span)

    let taskControler = createTaskControler(singleTask)
    taskControler.style.visibility = 'hidden'
    singleTask.appendChild(taskControler)

    singleTask.onmouseenter = function () {
        taskControler.style.visibility = 'visible'
    }
    singleTask.onmouseleave = function () {
        taskControler.style.visibility = 'hidden'
    }
    col.appendChild(singleTask)
    parent.appendChild(col)
}

function createTaskControler(parent) {
    let controlPanner = create({ 'class': 'task-control-panel d-flex align-items-center' })
    let colorPallete = createColorPalette(parent)
    controlPanner.appendChild(colorPallete)

    let editButton = createEditButton(parent)
    controlPanner.appendChild(editButton)
    return controlPanner
}
function createEditButton(parent){
    let span = create('span', { 'class': 'ml-auto mr-2' })
    span.innerHTML = '<i class="far fa-edit"></i>'
    span.style.color = "white"
    span.style.fontSize = "20px"
    span.addEventListener("click", function(){

        let p = parent.querySelector('p')
        let textArea = create('textarea', {'class': 'inner-textarea'})
        textArea.style.width = parent.offsetWidth + 'px'
        textArea.style.height = parent.offsetHeight + 'px' //
        textArea.innerHTML = p.innerHTML

        parent.appendChild(textArea)

        textArea.addEventListener('keypress', function(event){
            if (event.keyCode === 13){

                event.stopPropagation()

                if(this.value){
                    p.innerHTML = this.value
                    parent.removeChild(this)
                }else{
                    alert("plese enter something")
                }
            }
        })
        
    
    })

    return span
}
function createColorPalette(parent) {
    const colors = ['palegreen', 'skyblue', 'orange', 'salmon', 'powderblue']
    let colorDiv = create({ 'class': 'd-flex' })
    colors.forEach(color => {
        let div = create({ 'class': 'color-circle ml-1 my-1' })
        div.style.background = color
        div.addEventListener('click', function () {
            parent.style.background = color
        })
        colorDiv.appendChild(div)
    })
    return colorDiv
}