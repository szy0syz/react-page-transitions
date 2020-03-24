import Link from 'next/link';
// import fetch from "isomorphic-unfetch";
import { motion } from 'framer-motion';
import p1 from '../images/image01.png';
import p2 from '../images/image02.png';
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
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
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
              <motion.img
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                key={product.id}
                src={product.image}
                width={250}
              />
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

const data = [
  {
    id: 'ghost-whey-x-chips-ahoy',
    name: 'Ghost Whey X Chips Ahoy',
    details:
      "We've said it before and we will say it again, nothing beats the real thing. With years of R&D and REAL CHIPS AHOY!® cookie pieces in every scoop, this flavor is second to none.",
    price: '$39.99',
    image: p1,
  },
  {
    id: 'ghost-whey-vegan',
    name: 'GHOST® Vegan Protein',
    details:
      'GHOST Vegan Protein combines a premium, fully disclosed vegan protein blend with industry-leading flavors...what more could you ask for?',
    price: '$49.99',
    image: p2,
  },
];

Index.getInitialProps = async function() {
  // const res = await fetch("http://my-json-server.typicode.com/wrongakram/demo/products");
  // const data = await res.json();
  return {
    products: data,
  };
};

export default Index;
