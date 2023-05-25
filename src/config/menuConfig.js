

const menuList = [
  {
    title: 'Home', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'DashboardOutlined', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: 'Catalog',
    key: '/catalog',
    icon: '<ShoppingOutlined />',
    subMenuList: [
      // 子菜单列表
      {
        title: 'Category',
        key: '/category',
        icon: '<PlusCircleOutlined />',
      },
      {
        title: 'Product',
        key: '/product',
        icon: '<PlusCircleOutlined />',
      },
    ],
  },

  {
    title: 'User',
    key: '/user',
    icon: '<UsergroupAddOutlined />',
  },
  {
    title: 'Role',
    key: '/role',
    icon: '<UserOutlined />',
  },

  {
    title: 'Charts',
    key: '/charts',
    icon: '<AreaChartOutlined />',
    subMenuList: [
      {
        title: 'Bar Chart',
        key: '/charts/bar',
        icon: '<BarChartOutlined />',
      },
      {
        title: 'Line Chart',
        key: '/charts/line',
        icon: '<LineChartOutlined />',
      },
      {
        title: 'Pie Chart',
        key: '/charts/pie',
        icon: ' <PieChartOutlined />',
      },
    ],
  },

  {
    title: 'Order',
    key: '/order',
    icon: '<ShoppingCartOutlined />',
  },
];

export default menuList;
