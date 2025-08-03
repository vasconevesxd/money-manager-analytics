<script setup lang="ts">
  import { Home, Wallet, ChartColumnStacked, ArrowDownToLine } from 'lucide-vue-next';
  import { cn } from '@/lib/utils';
  import { Button } from '@/components/ui/button';

  const navItems = [
    { name: 'Dashboard', icon: Home, route: '/' },
    { name: 'Categories', icon: ChartColumnStacked, route: '/categories' },
    { name: 'Import', icon: ArrowDownToLine, route: '/import' },
  ];
</script>

<template>
  <header class="sticky top-0 z-40 w-full border-b bg-background">
    <div class="flex h-16 items-center justify-between mx-4">
      <div class="flex">
        <router-link to="/" class="flex items-center">
          <Wallet class="h-6 w-6 mr-2" />
          <span class="font-bold">Money Manager Analytics</span>
        </router-link>
      </div>
      <nav class="flex items-center space-x-4">
        <router-link v-for="item in navItems" :key="item.name" :to="item.route" custom>
          <template #default="{ isActive, navigate }">
            <Button
              variant="ghost"
              :class="
                cn(
                  isActive ? 'bg-muted' : 'hover:bg-transparent hover:underline',
                  'flex items-center gap-2 cursor-pointer'
                )
              "
              @click="navigate"
            >
              <component :is="item.icon" class="h-4 w-4" />
              <span>{{ item.name }}</span>
            </Button>
          </template>
        </router-link>
      </nav>
    </div>
  </header>
</template>
