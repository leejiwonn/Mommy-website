    /* video */
    
    var galleryEl = document.getElementById('gallery');
    var viewEl = galleryEl.getElementsByClassName('view')[0];
    var viewItemEl = viewEl.getElementsByClassName('view-item');
    var listEl = galleryEl.getElementsByClassName('list')[0];
    var listItemEl = listEl.getElementsByTagName('li');
    var listItemAEl = listEl.getElementsByTagName('a');
    var videoEl = viewEl.getElementsByClassName('video');
    var _cuId = 0;
    var _exId = _cuId;
    var _videoList = ["oYC-7MYJexo", "77R_y3PyMrk", "NeLDmNFxkOI", "4_4P2L9wP6o"];
    var _players = [];
    var _defaults = {autoplay:0, controls:0, rel:0, fs:0, modestbranding:0, showinfo:0};
    function btnListClick(id){
      listItemAEl[id].addEventListener('click',function(e){
        e.preventDefault();
        _cuId = id;
        changeVideo();
      });
    }
    function changeVideo(){
      listItemAEl[_exId].parentElement.classList.remove('selected');
      viewItemEl[_exId].classList.remove('selected');
      _players[_exId].tv.pauseVideo();
      _players[_exId].tv.seekTo(0);
      listItemAEl[_cuId].parentElement.classList.add('selected');
      viewItemEl[_cuId].classList.add('selected');
      _players[_cuId].tv.playVideo();
      _exId = _cuId;
    }
    for(var i = 0; i < listItemAEl.length; i++){
      btnListClick(i);
    }
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    function onYouTubeIframeAPIReady() {
      for(var i in videoEl){
        var tv = new YT.Player(videoEl[i], {videoId : _videoList[i], suggestedQuality :  "hd1080", events: {"onReady": onPlayerReady, "onStateChange": onPlayerStateChange}, playerVars: _defaults});
        _players.push({
          el : videoEl[i],
          tv : tv
        });
      }
    }
    function onPlayerReady(e) {
      for(var i in _players){
        _players[i].tv.setSize(800, 450);
        _players[i].el.style.display = 'block';
        if(_cuId == i){
          _players[i].tv.playVideo();
        }
      }
    }
    function onPlayerStateChange(e) {
      var state = YT.PlayerState;
      if(e.data == state.UNSTARTED) {
      }else if(e.data == state.ENDED) {
      }else if(e.data == state.PLAYING) {
      }else if(e.data == state.PAUSED) {
      }else if(e.data == state.BUFFERING) {
      }else if(e.data == state.CUED) {
      }
    }

    /* photo */

    var $pgallery = document.getElementById('p-gallery');
    var $photo = $pgallery.querySelector('.photo');
    var $plist = $pgallery.querySelector('.p-list');
    var $photoContainer = $photo.querySelector('.photo-container');
    var $photoItem = $photoContainer.querySelectorAll('.photo-item'); 
    // var $photoItem = $photoContainer.children();
    var $plistItem = $plist.querySelectorAll('a'); 
    
    var $btn = document.getElementsByClassName('btn')[0];
    var $prev = $btn.querySelector('#prev');
    var $next = $btn.querySelector('#next');
    
    var _galleryH = 800;
    // 갤러리의 width 값
    var _cuIdd = 0;
    var _exIdd = 0;
    var _max = $photoItem.length;
    // 전체 이미지의 개수
    
    // 갤러리 리사이즈
    function galleryResize(){
        console.log(_max);
        // 800 * 4 = 3200px
        $photoContainer.style.height = _galleryH * _max + 'px';
        for(var i = 0; i < $photoItem.length; i++){
            $photoItem[i].style.height = _galleryH + 'px';
        }
    }
    
    $photoContainer.style.transform = 'translate3d(0, ' + _galleryH * _cuIdd * -1 + 'px, 0)';
    $photoContainer.style.transitionPriperty = 'transform';
    
    function gallerySlide(){
    
    
        var duration = 600 + 400 * Math.abs(_cuIdd - _exIdd);
        console.log(duration); // 이미지의 간격에 따라 속도가 달라짐
    
       $photoContainer.style.transform = 'translate3d(0, ' + _galleryH * _cuIdd * -1 + 'px, 0)';
       $photoContainer.style.transitionPriperty = 'transform'; 
       // 움직일 스타일 속성
    
        $photoContainer.style.transitionDuration = 800 + 'ms'; // 속도
        // 가속도
        $photoContainer.style.transitionTimeFunction = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)';
    }
    
    $photoContainer,addEventListener('transitionend', function(){
        // transition이 끝나면 속성을 리셋시켜줌
        $photoContainer.style.transitionPriperty = null;
        $photoContainer.style.transitionDuration = null;
        $photoContainer.style.transitionTimeFunction = null;
    });
    
    function listClick(idd){
        function onClickList(event){
            event.preventDefault();
            // event callback 함수, 요소(태그)가 가지는 기본 속성을 방지(제거)
            
            var $ell = this, $parent = $ell.parentElement;
            // 선택한 요소 (this-a-), parentElement (해당 요소의 부모의 노드-li-)
    
            if(!$parent.classList.contains('selectedd')){
             _cuIdd = idd; 
            // 전역변수의 ID를 바꿈 - 현재 보여지는 이미지를 체크하기 위함
            $plistItem[_exIdd].parentElement.classList.remove('selectedd');
            $parent.classList.add('selectedd');
            gallerySlide();
            _exIdd = _cuIdd;
            // 다음에 클릭할 것을 대비하여, 이전 id를 현재의 id로 변경
            }
    
            console.log(idd);
        }
        $plistItem[idd].addEventListener('click', onClickList);
    }
    
    // 초기화
    function init(){
        galleryResize();
        // list item click 이벤트    
        for(var i = 0; i < $plistItem.length; i++){
            listClick(i);
        }
    }
    init();
    
    function clickPrev(event){
        event.preventDefault();
        _cuIdd--;
        if(_cuIdd < 0){
            _cuIdd = _max - 1;
        }
        gallerySlide();
    
        $plistItem[_exIdd].parentElement.classList.remove('selectedd');
        $plistItem[_cuIdd].parentElement.classList.add('selectedd');
        _exIdd = _cuIdd;
        console.log(_cuIdd);
        if(_cuIdd <= 3) {
            $plist.style.top = '20px';
            
        } else if(_cuIdd > 3){
            $plist.style.top = '-380px';
        }
    }
    $prev.addEventListener('click', clickPrev);
    
    function clickNext(event){
        event.preventDefault();
        _cuIdd++;
        if(_cuIdd > _max -1){
            _cuIdd = 0;
        }
        gallerySlide();
    
        $plistItem[_exIdd].parentElement.classList.remove('selectedd');
        $plistItem[_cuIdd].parentElement.classList.add('selectedd');
        _exIdd = _cuIdd;
        console.log(_cuIdd);
        
        if(_cuIdd > 3) {
            $plist.style.top = '-380px';
        } else if (_cuIdd <= 3) {
            $plist.style.top = '20px';
            
        }
    }
    $next.addEventListener('click', clickNext);