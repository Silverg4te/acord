// JavaScript Document

$().ready(function(){
	
	// DEFINE variables
	var audio_element = document.getElementById("audio_player");
	var video_element = document.getElementById("video_player");		
	
	// START the display toolbar
	
	var toolbar_buttons = '<div id="tools" class="pull-right"><div id="supporting_text_tools" class="supporting_text_control"><span class="glyphicon glyphicon-align-justify"></span><span class="tool_text"> Supporting Text</span> <a href="#" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Hide Supporting Text" id="show-hide-text"><span class="glyphicon glyphicon-eye-close"></span></a></div> <div class="text_control"><span class="glyphicon glyphicon-text-size"></span> <span class="tool_text"> Text Size</span> <a href="#" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Increase Text Size" id="increase-text"><span class="glyphicon glyphicon-plus"></span></a> <a href="#" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Decrease Text Size" id="decrease-text"><span class="glyphicon glyphicon-minus"></span></a></div> ';
	
	
	
		
	toolbar_buttons = toolbar_buttons + '<div id="narration_tools" class="narration_control"><span class="glyphicon glyphicon-bullhorn"></span><span class="tool_text"> Narration</span> <a href="#" id="narration_play_pause" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="Play Narration"><span class="glyphicon glyphicon-play"></span></a> <a href="#" class="btn btn-default btn-xs disabled" data-toggle="tooltip" data-placement="top" title="Replay Narration" id="narration_replay"><span class="glyphicon glyphicon-repeat"></span></a></div>';
	
	
	
	toolbar_buttons = toolbar_buttons + '</div>';
	
	
	// END the display toolbar

	$('header:first').after(toolbar_buttons);
	
	
	if($(window).width() < 768){
		// Position tool tip to bottom when small screen
		$("a[data-placement='top']").attr('data-placement','bottom');
		$("#tools a[class='btn btn-default btn-sm']").attr('class','btn btn-default btn-xs');
		
	}
	// START Function to show/hide text component and toggle button display
	//////////////////////////////////////////////////////////////////
	$('#show-hide-text').click(function(event){
		event.preventDefault();
		$('#av-component').removeClass('col-md-12').addClass('col-md-6');
		$('#text-component').toggle('slow',function(){
			if($(this).is(':visible')){
				$('#show-hide-text').tooltip('hide').html('<span class="glyphicon glyphicon-eye-close"></span>');
				$('#show-hide-text').attr('data-original-title','Hide Supporting Text');
				localStorage.removeItem("hide_text");
					
			} else {
				$('#show-hide-text').tooltip('hide').html('<span class="glyphicon glyphicon-eye-open"></span>');
				$('#show-hide-text').attr('data-original-title','Show Supporting Text');
				$('#av-component').toggleClass('col-md-6 col-md-12');
				localStorage["hide_text"] = 'hide';
			}			
		});		
		$(this).tooltip('hide');	  
		return(false);		
	});
	//////////////////////////////////////////////////////////////////
	// END Function to show/hide text component and toggle button display

	// START pause narration if video started
	///////////////////////////////////////////////////////////////////
	$('#video_player').on('play', function() {
		if(audio_element != null){
			if(!audio_element.paused){
				audio_element.pause();
				$('#narration_play_pause').html('<span class="glyphicon glyphicon-play"></span>');
				$('#narration_play_pause').attr('title','Play Narration').attr('data-original-title','Play Narration');
			}
		}
	});
	///////////////////////////////////////////////////////////////////
	// END pause narration if video started
	
	
	// START pause video if narration started
	///////////////////////////////////////////////////////////////////
	$('#audio_player').on('play', function() {
		if(video_element != null){
				if(!video_element.paused){
					video_element.pause();
				}
			}
	});
	///////////////////////////////////////////////////////////////////
	// END pause video if narration started		
	
	// START narration restart
	//////////////////////////////////////////////////////////////////
	$('#narration_replay').click(function(event){
			event.preventDefault();
			$(this).tooltip('hide');
			//window.alert('restart clicked!');
			audio_element.pause();
			audio_element.currentTime = 0;
			audio_element.play(); 
			
			$('#narration_play_pause').html('<span class="glyphicon glyphicon-pause"></span>');
			$('#narration_play_pause').attr('title','Pause Narration').attr('data-original-title','Pause Narration');
			
	});
	//////////////////////////////////////////////////////////////////
	// END narration restart
	

	// START narration play/pause toggle
	//////////////////////////////////////////////////////////////////
	
	$('#narration_play_pause').click(function(event){
		event.preventDefault();
		if(audio_element.paused == false){
			audio_element.pause();
			$(this).html('<span class="glyphicon glyphicon-play"></span>');
			$(this).attr('title','Play Narration').attr('data-original-title','Play Narration');
			
			
		}else{
			audio_element.play();
			$(this).html('<span class="glyphicon glyphicon-pause"></span>');
			$(this).attr('title','Pause Narration').attr('data-original-title','Pause Narration');
			$('#narration_replay').attr('class','btn btn-default btn-xs');
		}
		$(this).tooltip('hide');
	}).mouseleave(function(){$(this).tooltip('hide');});
	//////////////////////////////////////////////////////////////////
	// END narration play/pause toggle
	

	// Set text size increment value
	var increment = 3;
	// Store increased text size values to web storage
	$('#increase-text').click(function(event){		
		event.preventDefault();		
		localStorage["text_size"] = ((localStorage["text_size"]* 1) + increment);
		$('body').css('font-size',localStorage["text_size"]+'px');
		$(this).tooltip('hide');
		return(false);
	});
	// Store decreased text size values to web storage
	$('#decrease-text').click(function(event){
		event.preventDefault();
		localStorage["text_size"] = ((localStorage["text_size"]* 1) - increment);
		$('body').css('font-size',localStorage["text_size"]+'px');
		$(this).tooltip('hide');
		return(false);
	});
	
	// Begin web storage of data
	if (localStorage["hide_text"] == null) {
		// Display alert test to show text is being displayed
		// alert ("text being revealed");
	}else{
		// Display alert test to show text is being hidden
		// alert ("text being hidden");		
		$('#show-hide-text').html('<span class="glyphicon glyphicon-eye-open"></span>');			
		$('#text-component').hide();
		$('#av-component').removeClass('col-md-6').addClass('col-md-12');
	
	}
	if (localStorage["text_size"] == null) {
		// Set initial text size value		
		localStorage["text_size"] = 14;
	}else {
		// Set text size to a retained user preference
		var txt_size = localStorage["text_size"] * 1;
		$('body').css('font-size',txt_size+'px');
	}	
	

	// START small screen nav drop down menu
	$('#toggle_ss_nav').click(function(){
		//alert('clicked');
		$("span",this).toggleClass("glyphicon-menu-hamburger");
		
	});
	
	// END small screen nav drop down menu

	if($('#audio_player').length){
		//alert('Narration Present');
	}else{
		//alert('NO Narration');
		$('#narration_play_pause').attr('class','btn btn-default btn-xs disabled');
		$('#narration_tools').attr('class','narration_control opacity50');
		
	}

	if($('#av-component').length){
		//double column
	}else{
		//single column
		$('#show-hide-text').attr('class','btn btn-default btn-xs disabled');
		$('#supporting_text_tools').attr('class','supporting_text_control opacity50');
	}

	// Trigger Tooltips
	$('[data-toggle="tooltip"]').tooltip();
  
});