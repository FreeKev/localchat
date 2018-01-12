console.log('Hi from routing.js');

$('#delete-user').click(function(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'DELETE'
  }).success(function(data){
    window.location.href = '/';
  });
});

// $('.delete-link').click(function(e){
//   e.preventDefault();
//   $.ajax({
//     url: $(this).attr('href'),
//     method: 'DELETE'
//   }).success(function(data){
//     window.location.href = '/articles';
//   });
// });
//
// $('#delete-tag').click(function(e){
//   e.preventDefault();
//   $.ajax({
//     url: $(this).attr('href'),
//     method: 'delete'
//   }).success(function(response){
//     window.location.href = '/tags';
//   });
// });
