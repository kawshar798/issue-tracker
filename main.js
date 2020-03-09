document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
console.log(parseFloat(description.value));
/^[a-zA-Z() ]+$/
  if(description =="" ||  assignedTo ==""){

    showErrorMesg("Please Field can not be empty");

  }else if(!description.match(/^[a-zA-Z() ]+$/) || !assignedTo.match(/^[a-zA-Z() ]+$/) ){
  
    showErrorMesg("Please Enter Only Character");

  }else{

    const id = Math.floor(Math.random()*100000000) + '';
    const status = 'Open';
  
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')){
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  
    
     
  }
  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();

 
}

const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log(issues);
  const currentIssue = issues.find(issue => issue.id == id);
  // console.log(currentIssue.status);
  if(currentIssue.status != 'Closed'){
    currentIssue.status = 'Closed';
  }else{
    currentIssue.status = 'Open';
  
  }
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
 
}

const deleteIssue = id => {
  let deleteConrm = confirm('Are you sure to delete this issue?');
if(deleteConrm){
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue=> issue.id != id )
  // console.log(remainingIssues);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

}


const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
 
  issuesList.innerHTML = '';
  countissu(issues);
  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];
  
    
    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 class="${status=='Closed'?'stick':''}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time ${severity==='Low' ? 'low':severity==='Medium'?'medium':severity==='High'?'high':''}"></span > ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn  ${ status==='Closed' ? 'btn-success' : 'btn-warning'}">${ status==='Closed' ? 'open' : 'close'}</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}

//Length of issue 
function countissu(issues){
  if(issues){
    document.getElementById('issuLenght').innerText = issues.length;
    document.getElementById('openissuLenght').innerText = issues.filter(issue => issue.status === 'Open').length;
    document.getElementById('closeissuLenght').innerText = issues.filter(issue => issue.status === 'Closed').length;
  }

}


//Show Error message
function showErrorMesg(error){

  //Get element  Where Error Msg show
  const wrap = document.querySelector('.wrap');
  const title = document.querySelector('.title');
  //Create error div
  const errorDiv = document.createElement('div');
  //Add Class in Error div
  errorDiv.className = 'alert alert-danger';

  //assign error text in variable
  const errorText = document.createTextNode(error);

  //Error text append in errorDiv
  errorDiv.appendChild(errorText);
  console.log(errorDiv);

  //Insert error Above title
  wrap.insertBefore(errorDiv,title);

  // Clear error after 3 seconds
  setTimeout(cleaarError,5000);

}

//Clear Error Msg

function cleaarError(){
  document.querySelector('.alert').remove();
}