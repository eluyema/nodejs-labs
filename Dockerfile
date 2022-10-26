FROM node:16
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
COPY pnpm-lock.yaml ./
RUN pnpm fetch --prod
ADD . ./
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max_old_space_size=8192
RUN pnpm install --frozen-lockfile
RUN pnpm format:check
RUN pnpm lint:check
RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]
