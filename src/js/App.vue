<template>
	<div class="app-layout">
		<div class="content">
			<div class="header">
				<div class="container">
					<img class="header__logo" src="img/logo.svg" alt="">
					
					<!-- router-links -->
					<ul class="header__menu">
						<router-link tag="li" :to="{name: 'home'}" exact active-class="active"><a class="header__menu-link" href="">Home</a></router-link>
						<router-link tag="li" :to="{name: 'about'}" active-class="active"><a class="header__menu-link" href="">About</a></router-link>
						<router-link tag="li" :to="{name: 'whatever'}" active-class="active"><a class="header__menu-link" href="">Whatever</a></router-link>
					</ul>

					<div class="header__space"></div>
				</div>
			</div>
			
			<div class="main">
				<div class="container">
					<!-- router view -->
					<transition name="fade" appear mode="out-in">
						<router-view></router-view>
					</transition>
				</div>
			</div>
		</div>
		<div class="footer">
			© <a class="footer__link" href="http://reg.ru" target="_blank">reg.ru</a> 2018
		</div>
	</div>
</template>

<script>
	
</script>

<style>

</style>
