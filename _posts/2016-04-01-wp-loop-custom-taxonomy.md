---
title: How To Loop Through a Custom Post Type Taxonomy
description: How to create a custom loop for a custom post type and display only a single taxonomy.
category: General Geekery
facebook_image_path:
---

What follows is a WordPress tutorial about displaying a single category of a custom post type.

The below example is a job board with a custom taxonomy for role type. In this case there are two types of jobs: Executive and Management. First we'll create the custom post type, then the custom taxonomy, and finally we'll write a loop to display only one of the taxonomies.

## Creating the Custom Post Type

There is a great site called [GenerateWP](https://generatewp.com/) that can help you create [custom post types](https://generatewp.com/post-type/), [custom taxonomies](https://generatewp.com/taxonomy/), [custom loops](https://generatewp.com/wp_query/), or a dozen other things. But here's how I created my custom "jobs" post type:

```php
<?php

//* Add Jobs Post Type
add_action( 'init', 'register_jobs_post_type' );
function register_jobs_post_type() {
  register_post_type( 'jobs', array(
      'labels' => array(
        'name' => 'Jobs',
        'singular_name' => 'Job',
      ),
      'supports' => array(
        'title',
        'editor',
        'genesis-seo', // Adds SEO Settings for Genesis Framework
        'genesis-layouts', // Adds Layout Settings for Genesis Framework
        'genesis-cpt-archives-settings', // Adds Taxonomies for Genesis Framework
      ),
      'public' => true,
      'has_archive' => true,
      'show_in_menu' => true,
      'exclude_from_search' => false,
      'rewrite' => array( 'slug' => 'job' ),
      'query_var' => true,
      'menu_position' => 6,
      'menu_icon' => 'dashicons-clipboard',
    )
  );
}
```

Now that you have the code, you _could_ place it in your functions.php file, but in an effort to keep that file short and readable I create a directory in my child themes called "inc" (short for includes). Inside that directory I'll add a file called custom-post-types.php. Then I'll call custom-post-types.php in the functions file like this:

```php
<?php

//* Include Custom Post Types
include_once( get_stylesheet_directory() . '/inc/custom-post-types.php' );
```

## Creating the Custom Taxonomy

By default WordPress comes with categories and tags. In the case of this job board the client was already using the default taxonomies on his blog and I didn't want to confuse matters by using the same taxonomies inside the job board. Here is the code I used to create a new taxonomy that would keep separate the Executive and Management roles:

```php
<?php

//* Add Role Taxonomy for Jobs Post Type
add_action( 'init', 'rsi_job_role_type_taxonomy', 0 );
function rsi_job_role_type_taxonomy() {
  register_taxonomy( 'job_role', array( 'jobs' ), array(
      'labels' => array(
        'name' => _x( 'Role Type', 'taxonomy general name' ),
        'singular_name' => _x( 'Role Type', 'taxonomy singular name' ),
        'search_items' => __( 'Search Role Types' ),
        'all_items' => __( 'All Role Types' ),
        'parent_item' => __( 'Parent Role Type' ),
        'parent_item_colon' => __( 'Parent Role Type:' ),
        'update_item' => __( 'Update Role Type' ),
        'edit_item' => __( 'Edit Role Type' ),
        'add_new_item' => __( 'Add New Role Type' ),
        'new_item_name' => __( 'New Role Type' ),
        'menu_name' => __( 'Role Types' ),
      ),
      'rewrite' => array(
        'slug' => 'role-type'
      ),
      'hierarchical' => true,
    )
  );
}
```

I add this code in its own file in the /inc directory just as I did with the custom post types. In this case I called the file custom-taxonomies.php and call it in the functions file like so:

```php
<?php

//* Include Custom Taxonomies
include_once( get_stylesheet_directory() . '/inc/custom-taxonomies.php' );
```

**NOTE:** Including custom post types or custom taxonomies in your child theme's /inc directory is something you'll need to think about before you start coding. If you do include them in the child theme and the theme is changed later, that custom data will no longer be available. It is often better to add custom data like this as a plugin. If that data is added as a plugin it will be available no matter what happens with the theme in the future.

## Loop Trough Single Taxonomy of a Custom Post Type

Now that the taxonomy is built in the backend we can add the Executive and Management roles in the dashboard. Once WordPress knows they exist we can loop through them. In this case I'd built a custom template and used the loop below to call only the Executive role on that page.

```php
<?php

//* The Query
$exec_query = new WP_Query( array (
  'post_type' => 'jobs',
  'job_role'  => 'executive',
  'posts_per_page' => 4
) );

//* The Loop
if ( $exec_query->have_posts() ) { ?>

      <h3 class="title">Executive</h3>

      <ul> <?php

    while ( $exec_query->have_posts() ): $exec_query->the_post(); ?>

        <li>
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </li> <?php

    endwhile; ?>

      </ul> <?php

    //* Restore original Post Data
    wp_reset_postdata();

}
```

If you want to see the live code for this project, the theme files are [available on GitHub](https://github.com/bradonomics/rsi-international/) and the display of this loop can be seen on [the client's site](http://rsiinternational.asia/candidate/#available-positions).
