defmodule EchoClient do
  use WebSockex
  require Logger

  def start_link(opts \\ []) do
    WebSockex.start_link("ws://127.0.0.1:6969", __MODULE__, :fake_state, opts)
  end

  @spec echo(pid, String.t()) :: :ok
  def echo(client, message) do
    Logger.info("Sending message: #{message}")
    WebSockex.send_frame(client, {:text, message})
  end

  def handle_connect(_conn, state) do
    Logger.info("Connected!")
    {:ok, state}
  end

  def handle_frame({:text, "Can you please reply yourself?" = msg}, :fake_state) do
    Logger.info("Received Message: #{msg}")
    msg = "Sure can!"
    Logger.info("Sending message: #{msg}")
    {:reply, {:text, msg}, :fake_state}
  end

  def handle_frame({:text, "Close the things!" = msg}, :fake_state) do
    Logger.info("Received Message: #{msg}")
    {:close, :fake_state}
  end

  def handle_frame({:text, msg}, :fake_state) do
    Logger.info("Received Message: #{msg}")
    {:ok, :fake_state}
  end

  def handle_disconnect(%{reason: {:local, reason}}, state) do
    Logger.info("Local close with reason: #{inspect(reason)}")
    {:ok, state}
  end

  def handle_disconnect(disconnect_map, state) do
    super(disconnect_map, state)
  end
end

defmodule Test do
  def main() do
    thrust = 0.8
    interval = 10

    EchoClient.start_link()
    |> case do
      {:ok, pid} ->
        1..5
        |> Enum.each(fn stroke ->
          1..50
          |> Enum.each(fn _ ->
            EchoClient.echo(pid, "{\"thrust\": #{thrust}}")
            Process.sleep(interval)
          end)

          Process.sleep(175)
        end)

        thrust = 0.82

        1..5
        |> Enum.each(fn stroke ->
          1..50
          |> Enum.each(fn _ ->
            EchoClient.echo(pid, "{\"thrust\": #{thrust}}")
            Process.sleep(interval)
          end)

          Process.sleep(150)
        end)

      {:error, error} ->
        IO.inspect(error, label: :error)
    end
  end
end
