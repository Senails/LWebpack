import * as $ from 'jquery';
import analitics from './analitics';

import { Post } from '@models/Post';
import './styles/styles.css';
import webpacklogo from './assets/webpack-logo.png';


let post = new Post("1titel", webpacklogo);

$('pre').html(post.toString() + "1");