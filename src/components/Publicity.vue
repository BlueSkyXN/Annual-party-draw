<template>
  <div class="c-Publicity">
    <el-carousel
      height="50px"
      :autoplay="true"
      indicator-position="none"
      arrow="never"
      :interval="3000"
    >
      <el-carousel-item v-for="item in message" :key="item.key">
        <div class="item" :class="{ actiname: item.key === 0 }">
          <span v-if="item.title" class="title">
            <span class="title-text">{{ item.title }}</span>
          </span>
          <span v-if="item.value" class="value">
            {{ item.value }}
          </span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { conversionCategoryName } from '@/helper/index';

export default {
  name: 'Publicity',
  computed: {
    config() {
      return this.$store.state.config;
    },
    result() {
      return this.$store.state.result;
    },
    message() {
      const { result, config } = this;
      const fields = Object.keys(config);

      let message = [{ key: 0, title: config.name }];
      fields.forEach((item, index) => {
        let label = conversionCategoryName(item);
        if (result[item] && config[item] > 0) {
          message.push({
            key: index + 1,
            title: `${label}抽奖结果:`,
            value: `${
              result[item].length > 0 ? result[item].join('、') : '暂未抽取'
            }`
          });
        }
      });

      return message;
    }
  }
};
</script>

<style lang="scss">
.c-Publicity {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  .el-carousel {
    width: 80vw;
    margin: 0 auto;
  }
  
  .item {
    text-align: center;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    
    .title {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      letter-spacing: 1px;
      padding: 0 15px;
      position: relative;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    
    .value {
      margin-left: 10px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    &.actiname {
      .title {
        .title-text {
          background: linear-gradient(45deg, #ff4444, #ff9966);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 24px;
          font-weight: bold;
          position: relative;
          padding: 0 10px;
          
          &::before,
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 20px;
            height: 2px;
            background: linear-gradient(90deg, rgba(255, 68, 68, 0.8), transparent);
          }
          
          &::before {
            left: -30px;
          }
          
          &::after {
            right: -30px;
            transform: rotate(180deg);
          }
        }

        &::before,
        &::after {
          content: '★';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          color: #ff6b6b;
          font-size: 16px;
          opacity: 0.8;
        }

        &::before {
          left: -5px;
        }

        &::after {
          right: -5px;
        }
      }
    }
  }
}

@keyframes shine {
  0% {
    background-position: -100px;
  }
  40%, 100% {
    background-position: 300px;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
</style>