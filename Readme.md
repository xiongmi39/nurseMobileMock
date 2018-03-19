#
调试
ionic serve

编译
ionic build android --prod

压缩
 npm run minify

但是–consolelogs参数不能单独使用，需配合–livereload参数使用，即：
在虚拟机上调试
$ ionic run/emulate android/ios --livereload --consolelogs

或者使用简写版本：

$ ionic run/emulate android/ios -l -c


新建组件
ionic g page myPage

√ Create app/pages/my-page/my-page.html
√ Create app/pages/my-page/my-page.ts
√ Create app/pages/my-page/my-page.scss
#