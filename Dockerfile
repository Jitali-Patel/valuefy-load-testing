FROM registry.access.redhat.com/ubi8/nodejs-16-minimal

USER root

RUN microdnf update -y && microdnf upgrade -y && microdnf install wget gzip -y

RUN wget https://github.com/grafana/k6/releases/download/v0.39.0/k6-v0.39.0-linux-amd64.tar.gz && tar -xzvf k6-v0.39.0-linux-amd64.tar.gz && mv k6-v0.39.0-linux-amd64/k6 /bin/ && chmod +x /bin/k6 && \
  microdnf remove wget gzip -y && microdnf clean all && rm -rf k6-v0.39.0-linux-amd64.tar.gz /mnt/rootfs/var/cache/* /mnt/rootfs/var/log/dnf* /mnt/rootfs/var/log/yum.*

USER 1001

WORKDIR /opt/app-root/src

ENV NODE_VERSION 16.14.0

#COPY package*.json ./

#RUN npm install
# Install application into container
COPY --chown=1001 . /opt/app-root/src

RUN mkdir -p test-results/reports
# ENTRYPOINT ["npm", "run", "test"]

CMD k6 run ${script} -e environment=${environment} -e vus=${vus} -e maxVUs=${maxVUs} -e api_thresholds=${api_thresholds} -e stages="${stages}"
