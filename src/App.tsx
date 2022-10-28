import {Post} from "./components/Post";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";

import style from './App.module.css';
import './global.css';


// implementar funcionalidades:
// author: {avatar_url: "", name: "", role: ""}
// publishedAt: Date
// content: String

const posts = [
  {
    id: 1,
    author:{
        avatarUrl: 'https://avatars.githubusercontent.com/u/88689453?v=4',
        name: 'Cadu Araujo',
        role: 'Desenvolvedor Full-Stack'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
      {type: 'link', content: 'jane.design/doctorcare'},
      {type: 'link', content: ''},
    ],
    publishedAt: new Date('2022-9-10 20:00:00'),
  },
  {
    id: 2,
    author:{
        avatarUrl: 'https://pps.whatsapp.net/v/t61.24694-24/145204168_1859537421061840_5456594216929034011_n.jpg?ccb=11-4&oh=01_AdT889CCDo-ljA9NLr1QvBhDt3HfidWszBbtWiQf1Ys5CA&oe=6367D30A',
        name: 'Milene',
        role: 'Assistente administrativa'
    },
    content: [
      {type: 'paragraph', content: 'Fala galeraa 👋'},
      {type: 'paragraph', content: 'Acabei de concluir minha graduação, irei deixar o link do meu projeto pessoal, agora vou mandar meu chefe a merda.🚀'},
      {type: 'paragraph', content: 'Agradeço muito meu namorado'},
      {type: 'link', content: 'caduaaraujoo'},
      {type: 'link', content: 'Meu projeto'},
    ],
    publishedAt: new Date('2022-10-10 20:00:00'),
  },
];

export function App() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
    <Sidebar />
        <main>
          {posts.map((post) => {
              return (
              <Post 
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
              );
          })}
        </main>
      </div>
    </div>
  )
}
