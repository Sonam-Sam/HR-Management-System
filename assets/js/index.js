$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

// $("#update_user").submit(function(event) {
//     event.preventDefault();
  
//     var formData = $(this).serializeArray();
//     var data = {};
  
//     $.map(formData, function(field) {
//       data[field.name] = field.value;
//     });
  
//     var urlParams = new URLSearchParams(window.location.search);
//     var userId = urlParams.get("id");
//     console.log("User ID:", userId);
  
//     // Set the value of the hidden input field
//     $("#user_id").val(userId);
  
//     var request = {
//       url: `http://localhost:3000/api/users/${userId}`,
//       method: "PUT",
//       data: data
//     };
  
//     $.ajax(request)
//       .done(function(response) {
//         alert("Data Updated Successfully!");
//         window.location.href = "/admindash";
//       })
//   });

// To delete the user
// if(window.location.pathname == "/"){
//     $ondelete = $(".table tbody td a.delete");
//     $ondelete.click(function(){
//         var id = $(this).attr("data-id")

//         var request = {
//             "url" : `http://localhost:3000/api/users/${id}`,
//             "method" : "DELETE"
//         }

//         if(confirm("Do you really want to delete this record?")){
//             $.ajax(request).done(function(response){
//                 alert("Data Deleted Successfully!");
//                 location.reload();
//             })
//         }

//     })
// }

// JavaScript code for filtering users based on gender checkboxes
const maleCheck = document.getElementById("maleCheck");
const femaleCheck = document.getElementById("femaleCheck");
const allCheck = document.getElementById("allCheck");
const userRows = document.querySelectorAll("#dataTable tbody tr");

function filterUsers() {
  userRows.forEach((row) => {
    const gender = row.querySelector("td:nth-child(3)").textContent.toLowerCase();
    const isVisible = (
      (maleCheck.checked && gender === "male") ||
      (femaleCheck.checked && gender === "female") ||
      allCheck.checked
    );

    row.style.display = isVisible ? "" : "none";
  });
}

maleCheck.addEventListener("change", filterUsers);
femaleCheck.addEventListener("change", filterUsers);
allCheck.addEventListener("change", filterUsers);

// Function to sort users based on name and direction
function sortUsers(sortOrder) {
  let table = document.getElementById("dataTable");
  let tbody = table.getElementsByTagName("tbody")[0];
  let rows = Array.from(tbody.getElementsByTagName("tr"));

  // Sort rows based on name column and direction
  rows.sort(function (a, b) {
    let nameA = a.cells[0].innerHTML.toLowerCase();
    let nameB = b.cells[0].innerHTML.toLowerCase();

    if (sortOrder === 'asc') {
      return nameA.localeCompare(nameB);
    } else if (sortOrder === 'desc') {
      return nameB.localeCompare(nameA);
    } else {
      return 0; // No sorting
    }
  });

  // Clear table body
  tbody.innerHTML = "";

  // Append sorted rows to table body
  rows.forEach(function (row) {
    tbody.appendChild(row);
  });
}