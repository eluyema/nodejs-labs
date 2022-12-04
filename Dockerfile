FROM node:16
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch
ADD . ./
ENV GENERATE_SOURCEMAP=false
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]
