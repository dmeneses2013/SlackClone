defmodule Slackclone.UserView do
  use Slackclone.Web, :view

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    }
  end
end
