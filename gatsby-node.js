const _ = require('lodash')
const readingTime = require('reading-time')
const slugify = require('slugify')
const { createFilePath } = require('gatsby-source-filesystem')


// graphql function doesn't throw an error so we have to check to check for the result.errors to throw manually
const wrapper = promise =>
  promise.then(result => {
    if (result.errors) {
      throw result.errors
    }
    return result
  })

exports.onCreateNode = ({ node, actions}) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    createNodeField({ 
      node, 
      name: 'timeToRead', 
      value: readingTime(node.body).minutes })
    createNodeField({ 
      node, 
      name: 'slug', 
      value: slugify(node.frontmatter.title, {remove: /[*+~.()'"!:@]/g}) }) 
    }

}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const postTemplate = require.resolve('./src/templates/post.js')
  const categoryTemplate = require.resolve('./src/templates/category.js')

  const result = await wrapper(
    graphql(`
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node { 
              frontmatter {
                title
                categories
              }
              fields {
                slug
                timeToRead
              }
              id
            }
          }
        }
      }
    `)
  )

  const posts = result.data.allMdx.edges

  posts.forEach(({ node }, index) => {
    const next = index === 0 ? null : posts[index - 1]
    const prev = index === posts.length - 1 ? null : posts[index + 1]


    createPage({
      path: `/blog/${node.fields.slug}`,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
        prev,
        next,
      },
    })
  })

  const categorySet = new Set()

  posts.forEach(({ node }) => {
    if (_.get(node, 'frontmatter.categories')) {
      _.forEach(cat => {
        categorySet.add(cat)
      })
    }
  })

  const categories = Array.from(categorySet)
  console.log(categories)
  categories.forEach(category => {
    createPage({
      path: `/categories/${_.kebabCase(category)}`,
      component: categoryTemplate,
      context: {
        category,
      },
    })
  })
}