module.exports.registerPlayerEvents = (player) => {

    player.on("error", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
    });
    player.on("connectionError", (queue, error) => {
        console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
    });

    player.on("trackStart", (queue, track) => {
        queue.metadata.send(`Tocando **${track.title}** em **${queue.connection.channel.name}**!`);
    });

    player.on("trackAdd", (queue, track) => {
        queue.metadata.send(`**${track.title}** tá na fila`);
    });

    player.on("botDisconnect", (queue) => {
        queue.metadata.send("Adios");
    });

    player.on("channelEmpty", (queue) => {
        queue.metadata.send("Não tem ninguem no canal de voz...");
    });

    player.on("queueEnd", (queue) => {
        queue.metadata.send("Acabou a playlist");
    });

};
