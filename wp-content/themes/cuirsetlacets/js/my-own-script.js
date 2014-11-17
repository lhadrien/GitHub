/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


!jQuery(function($) {
   
    $('.clic_photo').on('click', function() {
        var photo = $(this).html();
        $('#my_photo').empty();
        $('#my_photo').prepend(photo);
        $('#modal_photo').modal('show');
    });
});