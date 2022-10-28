import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import  style from './Post.module.css'


interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

interface Content {
    type: 'paragraph' | 'link';
    content: string
}

interface PostProps {
    author: Author;
    publishedAt: Date;
    content: Content[];
}


export function Post({author, publishedAt, content}: PostProps){
    const [comments, setComments] = useState([
        'Post legal'
    ]);

    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    });


    function handleCreateNewComment(e: FormEvent){
        e.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }

    function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>){
        e.target.setCustomValidity("");
        setNewCommentText(e.target.value);
    }

    function handleNewCommentIvalid(e: InvalidEvent<HTMLTextAreaElement>){
        e.target.setCustomValidity("Este campo é obrigatório");
    }

    function deleteComment(commentToDelete: string){
        const commentsWithOutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete;
        });

        setComments(commentsWithOutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={style.post}>
            <header>
                <div className={style.author}>
                    <Avatar src={author.avatarUrl}/>
                    <div className={style.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={style.content}>
                {content.map(line => {
                    if(line.type === 'paragraph'){
                        return <p key={line.content}>{line.content}</p>
                    } else if(line.type == 'link'){
                        return <p key={line.content}><a href='#'>{line.content}</a></p>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={style.commentForm}>
                <strong>Deixe seu feddback</strong>

                <textarea
                    name='comment'
                    placeholder='Deixe um comentário'
                    onChange={handleNewCommentChange}
                    value={newCommentText}
                    onInvalid={handleNewCommentIvalid}
                    required
                />
                
             <footer>
                <button type='submit'disabled={isNewCommentEmpty}>
                    Publicar
                </button>
            </footer>  
            </form>

            <div className={style.commentList}>
              {comments.map(comment => {
                return (
                <Comment 
                    key={comment} 
                    content={comment} 
                    onDeleteComment={deleteComment}
                />)
              })}
            </div>
        </article>
    );

}