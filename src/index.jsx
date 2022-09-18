import * as $ from 'jquery';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { Post } from '@models/Post';
import './babel';
import './styles/styles.css';
import './styles/style.scss';
import webpacklogo from './assets/webpack-logo.png';


let post = new Post("titel", webpacklogo);
$('pre').html(post.toString() + "1");

const App = ()=>{
    return <div className='reactbox'>
        Это реакт бокс отрендерен реактом
    </div>
}

let root = createRoot(document.querySelector("#box"));
root.render(<App/>);