FROM denoland/deno:2.0.6
EXPOSE 8000
WORKDIR /app
USER deno
COPY . .
# compile the main app inorder to not compile on each run
RUN deno cache main.ts
RUN timeout 10s deno -A main.ts || [ $? -eq 124 ] || exit 1
CMD ["run", "--allow-net", "main.ts"]
