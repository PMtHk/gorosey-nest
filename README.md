# 고로시롤 | Gorosey-LoL

<a href="https://koreanbots.dev/bots/1232212821530509332">
  <img src="./assets/gorosey_intro.png" alt="gorosey_intro_image" width="100%" />
</a>

<br/>

<div align="center">
  <a href="https://nestjs.com/">
    <img src="https://img.shields.io/badge/NestJS-black?style=for-the-badge&logo=nestjs&logoColor=E0234E" alt="nestjs" />
  </a>
  <a href="https://discord.js.org/">
    <img src="https://img.shields.io/badge/Discord.js-black?style=for-the-badge&logo=discord&logoColor=5865F2" alt="discord.js" />
  </a>
  <a href="https://developer.riotgames.com/">
    <img src="https://img.shields.io/badge/riotgames-black?style=for-the-badge&logo=riotgames&logoColor=EB0029" alt="riotgames" />
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/typescript-black?style=for-the-badge&logo=typescript&logoColor=3178C6" alt="typescript" />
  </a>
</div>

<br/>

[고로시롤](https://koreanbots.dev/bots/1232212821530509332)은 디스코드 서버에서 지정된 시간에 자동으로 소환사의 전적을 갱신해 알려주는 디스코드 봇 서비스 입니다.  
기존에는 [Express](https://expressjs.com/) 앱으로 작성되었으나, 현재 기능 추가와 동시에 [Nest.js](https://nestjs.com/) 로 마이그레이션을 진행하고 있습니다.

[기존 Repository](https://github.com/PMtHk/gorosey-lol)

## Nest.js 를 선택한 이유

### Express 기반

기존 고로시롤 서비스는 `Express` 앱으로 작성되어 있습니다.  
`Nest.js` 는 내부적으로 `Express` 를 사용하면서 추가적인 기능을 제공하기 때문에 쉽게 마이그레이션할 수 있을 것이라 생각했습니다.

### 모듈화 아키텍처

기존 고로시롤을 `Express` 로 개발하면서, 컨트롤러(실제로는 [Discord.js](https://discord.js.org/) - SlashCommand), 서비스, 레포지토리의 계층적인 구조를 설정하며 많은 시행착오를 겪었습니다.  
이 과정에서 체계적인 구조의 중요성을 실감하게 되었고, **Nest.js의 모듈화된 아키텍처**가 이러한 문제를 해결해 줄 것이라 생각했습니다.

### 의존성 주입 및 테스트 작성

`Nest.js` 는 강력한 DI 시스템을 제공하고 있습니다.  
Nest.js 는 모듈에 `providers` 라는 배열에 의존성을 제공할 클래스(w. `@Injectable()`)를 추가하면, DI 컨테이너가 이를 인스턴스와 합니다.  
이를 통해 간단히 객체간의 결합도를 줄일 수 있고, 각 프로바이더를 독립적으로 테스트할 수 있게 됩니다.  
`Nest.js` 의 더 직관적으로 의존관계를 파악할 수 있는 장점, 자동으로 인스턴스를 관리해주는 점 그리고 단위 테스트의 장점을 종합해 선택했습니다.

> 기존 고로시롤에서는 `typedi` 를 활용했습니다.

### 데코레이터 기반

`Nest.js` 는 데코레이터를 활용해 앱 내의 각 구성 요소를 선언적으로 정의할 수 있습니다. 비록 스프링 프레임워크를 직접 사용해본 적은 없지만, 스프링의 데코레이터 기반 개발 방식의 가독성과 직관성을 적용해보고 싶었습니다.  
`Nest.js` 의 데코레이터 기반 개발 방식이 앱 내의 모듈, 프로바이더 등의 역할을 명확히 적용하고 가독성을 높일 것이라 기대합니다.
