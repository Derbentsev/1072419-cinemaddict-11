import {
  render,
  remove,
} from 'Utils/render';
import {
  RenderPosition,
} from 'Consts/consts';
import {
  Comment,
} from '../components/comment/comment';


export class CommentController {
  constructor(container, commentModel, onCommentsDataChange) {
    this._container = container;
    this._commentModel = commentModel;
    this._onCommentsDataChange = onCommentsDataChange;

    this._commentComponent = null;
  }

  render(comment) {
    this._commentComponent = new Comment(comment);
    render(this._container, this._commentComponent, RenderPosition.BEFOREEND);
    this._commentComponent.setOnDeleteClick(() => this._onCommentsDataChange(this, comment, null));
  }

  destroy() {
    remove(this._commentComponent);
  }
}
