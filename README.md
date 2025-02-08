# Module Federation with Vue2 and Vue3

## What is Module Federation
Module Federation provides a solution to the scaling problem by allowing a SPA to be sliced into multiple smaller remote applications that are built independently. It has become more popular in recent years since the addition of the `ModuleFederationPlugin` in Webpack.

Three terms that make up the Module Federation architecture:
- A **remote** is an application that exposes a federated module that can be fetched over the network at runtime.
- A **host** is an application that consumes federated modules from remote applications at runtime. When you write your host application, you import the module from your remote as though it was part of the build, but at build time, Webpack is aware that this module will only exist at runtime.
- A **federated module** is any valid JavaScript module that is exposed by a remote application with the aim that it will be consumed by a host application. They can be shared between applications and updated without the need to redeploy everything.

### Shared API
When you have federated modules, they’re bundled separately and include all the dependencies they need to function. However, when they’re used in a host application, it’s possible for multiple copies of the same dependency to be downloaded. 

This is where the shared API becomes really handy. With the `shared` key in the configuration you can define libraries that can be shared and consumed by other federated apps. Both the remote and host have to add the same dependency in “shared” for it to be available for consumption.

- `eager (boolean)`: If true, the dependency will be eagerly loaded and made available to other federated apps as soon as the host application starts. If false, the dependency will be lazily loaded when it is first requested by a federated app.
- `singleton (boolean)`: If true, the dependency will be treated as a singleton and only a single instance of it will be shared among all federated apps.
- `requiredVersion (string)`: Specifies the required version of the dependency. If a federated app tries to load an incompatible version of the dependency, two copies will be loaded. If the `singleton` option is set to true a warning will be printed in the console.

## Run the project
```sh
# rspack built Vue2 as remote(3001), Vue3 as host(3002)
npm run dev

# rspack built Vue2 as remote(3001), Vue2 as host(3003)
npm run dev2
```

## Learn more
- https://github.com/module-federation/module-federation-examples
- https://github.com/originjs/vite-plugin-federation
- Micro-Frontends in Just 10 Minutes: https://www.youtube.com/watch?v=s_Fs4AXsTnA
- Micro-Frontends With RSpack and Module Federation: https://www.youtube.com/watch?v=32_EikGKESk
