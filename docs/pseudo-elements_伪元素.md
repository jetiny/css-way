
#### input，img，iframe等元素都不能包含其他元素，所以不能通过伪元素插入内容

w3c规定 https://www.w3.org/TR/CSS21/generate.html#before-after-content

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：一丝
链接：http://www.zhihu.com/question/21296044/answer/27011625
来源：知乎

the :before and :after pseudo-elements specify the location of content before and after an element's document tree content. 
The 'content' property, in conjunction with these pseudo-elements, specifies what is inserted.

:before和:after伪元素指定了一个元素文档树内容之前和之后的内容。'content'属性，与这些伪元素联用，指定了插入的内容。

Chrome 中input、checkbox和radio可以插入, 如chrome的打印页码中就有用到, 还是chrome人性化点.
