# demo

## Steps

> [my-json-server.typicode.com](my-json-server.typicode.com) 是个好东西！

- 首先把整个路由用动画组件包裹起来

```js
// src/_app.js
class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return ( // ----------
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    );      // -----------
  }
}
```

- 然后修改首页 `index.js`，让它真正离开完时 `opacity:0`

```js
// src/index.js
const Index = props => (
  // 全部离开完时全透明
  <motion.div exit={{ opacity: 0 }}>
  // ... ... ... ... ...
  </motion.div>
);
```

- 产品详情页同样的，完全离开时 `opacity:0`
  - 代码一致

- 首页 FadeInUp 动画

```js
// animate -> defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Our custom easing
let easing = [0.6, -0.05, 0.01, 0.99];

// Custom variant
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing
    }
  }
};

// stagger 的 staggerChildren 控制遍历的每个动画元素之间的延迟时间，例如 1号 播完等.12s 再放 2号
const stagger = {
  animate: {
    transition: {
      staggerChildren: .12
    }
  }
};

const Index = props => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className="container center">
      <div className="title">
        <h1>Select a protein</h1>
      </div>
      <motion.div variants={stagger} className="product-row">
        {props.products.map(product => (
          <Link key={product.id} href="/products/[id]" as={`/products/${product.id}`}>
            <motion.div variants={fadeInUp} className="card">
              <span className="category">Protein</span>
              <motion.img key={product.image} src={product.image} width={250} />
              <div className="product-info">
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </motion.div>
);
```

![11](/preview/ghost-p1.gif)

> 要做页面动画，页面左外侧容器div要做初始化
>
> initial="initial" animate='animate'

```js
<motion.div exit={{ opacity: 0 }} initial="initial" animate='animate'>
```
