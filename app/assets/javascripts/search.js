$(function(){
// $('#new_movie').find('input').hide();
$('#new_movie').on('click', '.result-vine', function(){
$(this).find('input').prop('checked', true);
})

})