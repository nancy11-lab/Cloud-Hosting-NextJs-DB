// Create new article
export interface CreateArticleDto {
  title: string;
  description: string;
}

// Update article
export interface UpdateArticleDto {
  title?: string;
  description?: string;
}

// Register new user
export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
}
// Login User
export interface LoginUserDto {
  email: string;
  password: string;
}
// User Update Profile
export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
}
 // create new comment
export interface CreateCommentDto {
  text: string;
  articleId : number;
}

// update comment
export interface UpdateCommentDto {
  text: string;
}
