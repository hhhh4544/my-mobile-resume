
;(function (desW) {
    var winW=document.documentElement.clientWidth;
    var ratio=winW/desW;
    document.documentElement.style.fontSize=ratio*100+'px'
})(640);



var mySwiper=new Swiper('.swiper-container',{
    direction:'vertical',
    loop:true,/*无缝循环滚动*/
    onTransitionEnd:function (swiper) {
        //onSlideChangeEnd
        /*slide2  slide1   slide2   slide1(新的数组，长度=原数组长度的基础上+2)
         索引值0   page2   page(length-2)[新数组的倒数第二张]
         索引值1   page1
         索引值2   page2
         索引值length-1   page1   page1
         从一个slide结束到另一个slide结束执行的回调函数*/
        var curIndex=swiper.activeIndex
        //获取当前滑块的索引值
        var slideAry=swiper.slides;//x获取当前所有的滑块的个数
        var total=slideAry.length
        var targetId='page'   //id名：字符串拼接
        switch (curIndex){
            //即使有多张图片
            case 0://当滑到的是第一张的时候，是倒数第2张
                targetId+=total-2;
                break;
            case total-1:  //当滑到最后一张的时候，加一个page1的id名
                targetId+=1;
                break;
            default:
                targetId+=curIndex
            /*只处理首尾两张图片，中间的图片不做处理，该有的动态样式还是有的，所以在default里，当前的id值和当前的索引值一样*/
        }
        [].forEach.call(slideAry,function (item,index) {
            //循环数组的每一项  动态增加滑块的id值
            if(curIndex===index){
                item.id=targetId
            }else {
                item.id=null
            }
        })

    }

});


var musicBox=document.querySelector('#musicBox')
var musicAudio=document.querySelector('#musicAudio')
setTimeout(function () {
    musicAudio.play()//自带的播放方法
    musicAudio.addEventListener('canplay',function () {
        musicBox.className='music musicMove'
    },false)
},1000)
musicBox.addEventListener('click',function () {
    if(musicAudio.paused){//暂停状态—》播放
        musicAudio.play()
        musicBox.className='music musicMove'
    }else {//播放状态—》暂停
        musicAudio.pause()
        musicBox.className='music'
        musicBox.style.opacity=1
    }
})