<?php //Блок с письмами благодарных клиентов ?>
<section class="thanks">
				<div class="thanks__content">
					<?php echo $content_after_more; ?>
				</div>
				<div class="thanks__letters">
					<?php $posts = get_posts(array('numberposts' => 0, 'post_type'=> 'clients'));
						foreach($posts as $post){
						    setup_postdata($post);
						if(CFS()->get('clients_letter')):
					?>
					<img src="<?php echo CFS()->get('clients_letter'); ?>" alt="Благодарственное письмо">
					<?php
					    endif;
						}
						wp_reset_postdata();
					?>
</section>	