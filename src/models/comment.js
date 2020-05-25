export class CommentModel {
  constructor(data) {
    this.id = data.id;
    this.text = data.comment;
    this.emotion = data.emotion;
    this.author = data.author;
    this.date = data.date;
  }

  toRaw() {
    return {
      "author": this.author,
      "comment": this.text,
      "date": this.date,
      "emotion": this.emotion,
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }

  static clone(data) {
    return new CommentModel(data.toRaw());
  }
}
