function getImageDivTemplate(imgPath, tags) {
    var string = '<div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item" data-tags='+tags+'>'+
        '<div class="position-relative">'+
            '<img src="' + imgPath + '" alt="Image" class="img-fluid tm-catalog-item-img">'+
        '</div>'+          
        '<div class="p-4 tm-bg-gray tm-catalog-item-description">'+
            '<h3 class="tm-text-primary mb-3 tm-catalog-item-title">Sed mattis nisi erat</h3>'+
            '<p class="tm-catalog-item-text">Text goes here</p>'+
        '</div>'+
    '</div>';
    var object = $('<div/>').html(string).contents();
    return object;
}

$('#load').on('click', function() {
    var mainDiv = $('.tm-catalog-item-list');
    if(mainDiv.data('empty')){
        $.ajax({
            url: 'http://localhost:5000/images',
            success: function(result) {
                console.log(result);
                var data = {};
                for(var idx in result ){
                    var imgPath = 'img/' + result[idx].name;
                    var imageObjTemplate = getImageDivTemplate(imgPath, result[idx].tags);
                    mainDiv.append(imageObjTemplate);
                    
                    result[idx].tags = result[idx].tags.split(',');
                    data[imgPath] = result[idx];
                }
                window.localStorage.setItem('imageData', JSON.stringify(data));
                mainDiv.data('empty', 0);
            }
        });
    }
});

$('.show-all').on('click', function(e) {
    e.preventDefault();
    $('.tm-category-link').removeClass('active');
    $(this).children('.tm-category-link').addClass('active');
});

$('.show-dogs').on('click', function(e) {
    e.preventDefault();
    $('.tm-category-link').removeClass('active');
    $(this).children('.tm-category-link').addClass('active');
    $('.tm-catalog-item').hide();

    var tag = 'dog';
    var mainDiv = $('.tm-catalog-item-list');
    var imageData = JSON.parse(window.localStorage.getItem('imageData'));
    mainDiv.find('div').each(function(){
        var $this = $(this);
        var tags = $this.data('tags');
        console.log('data tags: ' + tags);
        if(tags) {
            var imgSrc = $this.children().find('img').attr('src');
            var imgTags = imageData[imgSrc].tags;
            console.log('img tags: ' + imgTags);
            for(var tag in imgTags){
                if(tags.includes(imgTags[tag])) {
                    $this.show();
                    break;
                }
            }
        }
    });

});

$('.show-people').on('click', function(e) {
    e.preventDefault();
    $('.tm-category-link').removeClass('active');
    $(this).children('.tm-category-link').addClass('active');
});

$('.show-korea').on('click', function(e) {
    e.preventDefault();
    $('.tm-category-link').removeClass('active');
    $(this).children('.tm-category-link').addClass('active');
});

$('.show-japan').on('click', function(e) {
    e.preventDefault();
    $('.tm-category-link').removeClass('active');
    $(this).children('.tm-category-link').addClass('active');
});