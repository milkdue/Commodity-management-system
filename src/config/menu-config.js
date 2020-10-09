import {
  HomeOutlined,
  AccountBookOutlined,
  BarsOutlined,
  ShoppingOutlined,
  UserOutlined,
  ContactsOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
/* 
左侧Menu导航的数据配置
*/
// 根据menuList生成<Item>和<SubMenu>组件的数组
const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: HomeOutlined, // 图标名称<HomeOutlined />
    path: '/admin/home',
    isPublic: true // 不需要进行权限检查
  },
  {
    title: '商品',
    key: 'production',
    icon: AccountBookOutlined,
    children: [ // 子菜单列表
      {
        title: '分类管理',
        key: 'category',
        path: '/admin/production/category',
        icon: BarsOutlined
      },
      {
        title: '商品管理',
        key: 'product',
        path: '/admin/production/product',
        icon: ShoppingOutlined
      },
    ]
  },

  {
    title: '用户管理',
    key: 'user',
    icon: UserOutlined,
    path: '/admin/user'
  },
  {
    title: '角色管理',
    key: 'role',
    icon: ContactsOutlined,
    path: '/admin/role'
  },

  {
    title: '图形图表',
    key: 'charts',
    icon: AreaChartOutlined,
    children: [
      {
        title: '柱状图',
        key: 'bar',
        icon: BarChartOutlined,
        path: '/admin/charts/bar'
      },
      {
        title: '折线图',
        key: 'line',
        icon: LineChartOutlined,
        path: '/admin/charts/line'
      },
      {
        title: '饼状图',
        key: 'pie',
        icon: PieChartOutlined,
        path: '/admin/charts/pie'
      },
    ]
  },
]

export default menuList