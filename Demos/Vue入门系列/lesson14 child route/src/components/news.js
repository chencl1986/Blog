import NewsHeader from './news_header';
import News1 from './news1';
import News2 from './news2';


//组件
export default {
  template: `
  <div>
    新闻
    <router-view name="news_header"></router-view>
    <router-view></router-view>
  </div>
`
}

export let router=[
  {
    path: '1',
    name: 'news1',
    components: {
      news_header: NewsHeader,
      default: News1
    }
  },
  {
    path: '2',
    name: 'news2',
    components: {
      news_header: NewsHeader,
      default: News2
    }
  }
];
