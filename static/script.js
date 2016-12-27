$(document).ready(function(){	
	$('#container #registratedStage').fadeOut();
	$('#toRegistr').click(function(){
		$('#containerForForm').empty();
		$.get('/sendRegFile',function(res){
			var userclick = res;
			$('#containerForForm').append(userclick).hide().fadeIn(900);
			$('#btnSubmit').click(function(){
				var params = {
					firstname: $('#firstname').val(),
					lastname: $('#lastname').val(),
					password: $('#password').val()
				}

				if(params.firstname == '' || params.password == '' || params.lastname == ''){
						alert('Enter all text areas...');
						return;
				}

				$.post('/isRegistered',params,function(res){
					alert(res);
					$('#firstname, #lastname, #password').val('');
					$('#form').fadeOut(500);
				});
				
			});
			$('#close').click(function(){
				$('#containerForForm #form').fadeOut(900);
				$('#containerForForm').empty().fadeIn();
			});
		});
	});






	$('#toLogin').click(function(){
		$('#containerForForm').empty();
		$.get('/sendLogFile',function(res){
			var userclick = res;
			$('#containerForForm').append(userclick).hide().fadeIn(900);

				$('#btnSubmitLogin').click(function(){
					var params = {
						firstname: $('#firstname').val(),
						password: $('#password').val()
					}
					if(params.firstname == '' || params.password == ''){
						alert('Enter all text areas...');
						return;
					}

					$.post('/trueLogin',params,function(res){
						if($('#header').text()){
						 	alert('You are allready logined...');
						 	$('#firstname, #password').val('');
						 	$('#formLogin').fadeOut(500);
						 	return;
						}
						if(res == params.firstname){
							var log = $('<p class="logText"> You are logined by: ' + res + '</p>');
							$('#header').append(log).append('<input type="button" value="Log Out" id="logOut">');
							$('#containerForForm').empty();
						}
						else{
							$('body').prepend(res);
							$('#containerForForm').empty();
						}
						$('#logOut').click(function(){
							$('#header .logText, #header #logOut').fadeOut(300);
							$('#header').empty();
						});
						$('#error').click(function(){
							$('#error').fadeOut(800);
							$('#containerForForm, #header').empty();
						});
					});
				});

			$('#close').click(function(){
				$('#containerForForm').fadeOut(900);
				$('#containerForForm').empty().fadeIn();
			});
		});
	});

});// finish READY