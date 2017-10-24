(function(){
// var element = document.getElementsByTagName('article')[0];
// var listElement = document.createElement('li');
// listElement.innerHTML = 'tst';
// element.getElementsByClassName('feed-base-update-control-panel-trigger')[0].getElementsByTagName('ul').appendChild(listElement);
var bookmarkedItems = localStorage.getItem('linkedin-bookmark') || '{}';
bookmarkedItems = JSON.parse(bookmarkedItems);
var navigationBar = document.querySelector('.nav-main.nav-container');
var bookmarkNavItem = document.createElement('li');
bookmarkNavItem.classList.add.apply(bookmarkNavItem.classList,['nav-item', 'nav-item--notifications'])
bookmarkNavItem.style.width = '80px !important';
bookmarkNavItem.style.cssText+='width:80px'
bookmarkNavItem.innerHTML = `<a data-alias="identity" class="nav-item__link js-nav-item-link nav-item__link--underline"><span class="nav-item__badge">
<span aria-hidden="true" class="nav-item__badge-count">1</span><span class="visually-hidden">1 new notification.</span></span>
<span id="notifications-tab-icon" class="nav-item__icon" lang="en" aria-role="presentation">
<li-icon aria-hidden="true" type="nav-small-notifications-icon" color="true">
<svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="nav-icon" xmlns="http://www.w3.org/2000/svg">
<g class="active-item" style="fill-opacity: 1">
<path d="M18.94,14H5.06L5.79,8.44A6.26,6.26,0,0,1,12,3h0a6.26,6.26,0,0,1,6.21,5.44Zm2,5-1.71-4H4.78L3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19Z"></path></g><g class="inactive-item" style="fill: currentColor"><path d="M20.94,19L19,14.49s-0.41-3.06-.8-6.06A6.26,6.26,0,0,0,12,3h0A6.26,6.26,0,0,0,5.79,8.44L5,14.49,3.06,19a0.71,0.71,0,0,0-.06.28,0.75,0.75,0,0,0,.75.76H10a2,2,0,1,0,4,0h6.27A0.74,0.74,0,0,0,20.94,19ZM12,4.75h0a4.39,4.39,0,0,1,4.35,3.81c0.28,2.1.56,4.35,0.7,5.44H7L7.65,8.56A4.39,4.39,0,0,1,12,4.75ZM5.52,18l1.3-3H17.18l1.3,3h-13Z"></path></g></svg></li-icon></span> 
<span class="nav-item__title">Bookmarks</span></a>`
navigationBar.appendChild(bookmarkNavItem);
var listItems = navigationBar.getElementsByTagName('li');
for(var i=0;i<listItems.length;i++){
    listItems[i].style.width = 'calc(100%/6)';
}
function refreshBookmarks() {

}
function getParentListElement(element,className,tagName="") {
    if(element.classList.contains(className) || element.tagName === tagName) {
        return element;
    }
    if(element.tagName === 'BODY'){
        return false;
    }
    return getParentListElement(element.parentNode,className,tagName);
}
var mainElement = document.getElementsByClassName('core-rail')[0];
mainElement.addEventListener('click',function(event){
    var targetElement = event.target;
    var parentListElement = getParentListElement(targetElement,'feed-base-update-control-panel-trigger', '');
    if(parentListElement && !getParentListElement(targetElement,'button-content-container')){
        setTimeout(function() {
            var listElement = document.createElement('li');
            listElement.classList.add.apply(listElement.classList,['action-item','extension-list-item']);
            listElement.innerHTML = `
    <button data-control-name="control_menu_copy_link" class="option-button option-button__share-via" data-ember-action="" data-ember-action-2565="2565">
      <span class="button-content-container">
        <span class="icon svg-icon-wrap"><li-icon aria-hidden="true" type="link-icon"><svg viewBox="0 0 24 24" width="24px" height="24px" x="0" y="0" preserveAspectRatio="xMinYMin meet" class="artdeco-icon"><g class="large-icon" style="fill: currentColor">
        <path d="M17.29,3a3.7,3.7,0,0,0-2.62,1.09L12.09,6.67A3.7,3.7,0,0,0,11,9.29a3.65,3.65,0,0,0,.52,1.86l-0.37.37a3.66,3.66,0,0,0-4.48.56L4.09,14.67a3.71,3.71,0,1,0,5.24,5.24l2.59-2.59A3.7,3.7,0,0,0,13,14.71a3.65,3.65,0,0,0-.52-1.86l0.37-.37a3.66,3.66,0,0,0,4.48-.57l2.59-2.59A3.71,3.71,0,0,0,17.29,3ZM11.13,14.71a1.82,1.82,0,0,1-.54,1.3L8,18.59A1.83,1.83,0,0,1,5.41,16L8,13.41a1.79,1.79,0,0,1,1.74-.48L8.28,14.4A0.94,0.94,0,0,0,9.6,15.73l1.46-1.46A1.82,1.82,0,0,1,11.13,14.71ZM18.59,8L16,10.59a1.79,1.79,0,0,1-1.74.48L15.73,9.6A0.94,0.94,0,0,0,14.4,8.27L12.94,9.74A1.79,1.79,0,0,1,13.41,8L16,5.41A1.83,1.83,0,0,1,18.59,8Z"></path>
      </g></svg></li-icon></span>
        <span class="text-description">
          <span class="headline Sans-15px-black-85%-semibold">
            Bookmark this.
          </span>
        </span>
      </span>
    </button>
 `;
            parentListElement.getElementsByTagName('ul')[0].appendChild(listElement);
        })
    }
     // check for bookmark extension click
            if(getParentListElement(targetElement,'button-content-container')) {
                var articleContainer = getParentListElement(targetElement,'123', 'ARTICLE');
                bookmarkedItems[articleContainer.dataset.id] = 'https://www.linkedin.com/feed/update/'+articleContainer.dataset.id;
                localStorage.setItem('linkedin-bookmark', JSON.stringify(bookmarkedItems));
            }
})
})();