const Quill = require('quill');
const InlineBlot = Quill.import('blots/block');
class ImageBlot extends InlineBlot {
  static create (data = {}) {
    const node = super.create(data);
    Object.keys(data).forEach(item => {
      node.setAttribute(item, data[item]);
    });
    return node;
  }
}
ImageBlot.blotName = 'imageBlot';
ImageBlot.className = 'lozad';
ImageBlot.tagName = 'img';
export default ImageBlot;
